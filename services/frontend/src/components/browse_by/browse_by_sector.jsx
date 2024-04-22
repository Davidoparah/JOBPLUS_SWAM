import React from 'react'
import Paginate from '../paginate/paginate';
import JobCard from '../job_card/job_card';
import jobService from '../../services/JobService';
import { useJobData } from '../../hooks/useJobData';
import { useParams } from 'react-router-dom';

export default function BrowseBySector() {
  const { fetchJobsBySectorId } = jobService();
  const { sectorId } = useParams();
  const { jobs, meta, handlePageChange, updateJobState } = useJobData(fetchJobsBySectorId, { sectorId });

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
