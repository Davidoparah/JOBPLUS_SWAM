import React from 'react';
import Paginate from '../paginate/paginate';
import JobCard from '../job_card/job_card';
import jobService from '../../services/JobService';
import { useJobData } from '../../hooks/useJobData';

export default function NotifiedJob() {
  const { fetchJobsByNotify } = jobService();
  const { jobs, meta, handlePageChange, updateJobState } = useJobData(fetchJobsByNotify);

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
