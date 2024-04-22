import { useApi } from '../hooks/useApi';

const savedJobService = () => {
  const { post, delete: del, get } = useApi();

  const saveJob = async (data, onSuccess) => {
    await post(`saved-jobs/`, { data, onSuccess });
  };

  const removeSavedJob = async (data, onSuccess) => {
    const { job, user } = data;
    await del(`saved-jobs/${job}/${user}`, { onSuccess });
  };

  const getSavedJobsCount = async (userId, onSuccess) => {
    const count = await get(`saved-jobs-count/${userId}`, { onSuccess });
    return count;
  };

  return {
    saveJob,
    removeSavedJob,
    getSavedJobsCount,
  };
};

export default savedJobService;
