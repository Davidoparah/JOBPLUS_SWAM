import { useApi } from '../hooks/useApi';

const applyJobService = () => {
  const { post, delete: del } = useApi();

  const applyForJob = async (data, onSuccess) => {
    await post(`applied-jobs/`, { data, onSuccess });
  };

  const withdrawApplication = async (data, onSuccess) => {
    const { jobId, userId } = data;
    await del(`applied-jobs/${jobId}/${userId}`, { onSuccess });
  }

  return {
    applyForJob,
    withdrawApplication,
  };
}

export default applyJobService;