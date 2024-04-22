import React from 'react'
import Paginate from '../paginate/paginate';
import JobCard from '../job_card/job_card';
import jobService from '../../services/JobService';
import { useJobData } from '../../hooks/useJobData';
import { useParams } from 'react-router-dom';

export default function BrowseByLocation() {
  const { fetchJobsByLocation } = jobService();
  const { location } = useParams();
  const { jobs, meta, handlePageChange, updateJobState } = useJobData(fetchJobsByLocation, { location });

  return (
    <section>
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          updateJobState={updateJobState}
        />
      ))}
      <Paginate meta={meta.paginate} onPageChange={handlePageChange} />
    </section>
  )
}
