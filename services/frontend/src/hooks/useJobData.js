import { useState, useEffect } from 'react';

export const useJobData = (fetchFunction, params={}) => {
  const [jobs, setJobs] = useState([]);
  const [meta, setMeta] = useState({});

  const handleSuccess = (res) => {
    const { entries, meta } = res.data;

    // update each job to include isTruncated
    const updatedJobs = entries.map((job) => ({
      ...job,
      isTruncated: true
    }));

    setJobs(updatedJobs);
    setMeta(meta);
  };

  const handlePageChange = (pageNumber) => {
    fetchFunction({page: pageNumber, ...params}, handleSuccess);
  };

  const updateJobState = (jobId, isSaved) => {
    setJobs(jobs.map(job => {
      if (job.id === jobId) {
        return { ...job, isSaved };
      }
      return job;
    }));
  };

  useEffect(() => {
    fetchFunction({page: 1, ...params}, handleSuccess);
  }, [JSON.stringify(params)]);


  return {
    jobs,
    meta,
    handlePageChange,
    updateJobState,
  };
};