import React from 'react'
import { useLocation } from 'react-router-dom'
import Paginate from '../paginate/paginate';
import JobCard from '../job_card/job_card';
import jobService from '../../services/JobService';
import { useJobData } from '../../hooks/useJobData';

export default function SearchResult() {
  const location = useLocation()
  const { formQuery } = location.state

  const { fetchJobs } = jobService();
  const { jobs, meta, handlePageChange, updateJobState } = useJobData(fetchJobs, { ...formQuery });

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
