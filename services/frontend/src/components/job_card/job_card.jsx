import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useModal } from '../../hooks/useModal';
import { useAuth } from '../../contexts/AuthContext';
import savedJobService from '../../services/SavedJobService';
import { useSavedJobCount } from '../../contexts/SavedJobCountContext';
import { StarSaved, StarUnSaved, Money, Location, Timer } from '../images';

const MAX_LENGTH_CHARS = 200;

export default function JobCard({ job, updateJobState }) {
  const [jobToSave, setJobToSave] = useState(null);
  const [isTruncated, setIsTruncated] = useState(true);
  const { CustomModal, setIsModalOpen } = useModal();
  const { saveJob, removeSavedJob } = savedJobService();
  const { incrementSavedJobCount, decrementSavedJobCount } = useSavedJobCount();

  const { getLoggedInUserId } = useAuth();

  const truncateText = (text) => {
    return isTruncated && text.length > MAX_LENGTH_CHARS
      ? text.slice(0, MAX_LENGTH_CHARS) + "..."
      : text;
  };

  const toggleTruncate = () => setIsTruncated(!isTruncated);

  const handleModalActions = async() => {
    const data = {
      job: jobToSave.id,
      user: getLoggedInUserId(),
    };

    if (job.isSaved) {
      await removeSavedJob(data);
      updateJobState(job.id, false);
      decrementSavedJobCount();
    } else {
      await saveJob(data);
      updateJobState(job.id, true);
      incrementSavedJobCount();
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
    setJobToSave(job);
  }

  return (
    <>
      <CustomModal onSuccess={() => handleModalActions()}>
        <p>{ jobToSave?.isSaved ? 'Removing job: ' + jobToSave?.title : 'Saving job: ' + jobToSave?.title }</p>
      </CustomModal>
      <div key={job.id} className="listing__card">
        <header className="listing__header">
          <h1 className="listing__title">{job.title}</h1>
          <img
            className="listing__saved"
            src={job.isSaved ? StarSaved : StarUnSaved}
            alt=""
            onClick={() => showModal(job)}
          />
          <p className="listing__company">
            Posted by <span>{job.company.name}</span>
          </p>
        </header>

        <ul className="listing__items">
          <li>
            <img src={Money} alt="" />
            <b>Salary {job.salaryType}</b>
          </li>
          <li>
            <img src={Location} alt="" />
            <b>{job.location}</b>
          </li>
          <li>
            <img src={Timer} alt="" />
            {job.job_types.map((type, index, array) => (
              <Fragment key={type.id}>
                <span>{type.title}</span>
                {index !== array.length - 1 && <span>, </span>}
              </Fragment>
            ))}
          </li>
        </ul>

        <p className="listing__detail">
          {truncateText(job.description)}
          <a onClick={() => toggleTruncate(job.id)}>
            <b>{isTruncated ? 'Read more' : 'Read Less'}</b>
          </a>
        </p>

        <Link to={`/apply/${job.id}`} className="listing__cta">
          <b>{job.hasApplied ? 'Withdraw application' : 'Apply Now'}</b>
        </Link>
      </div>
    </>
  );
}
