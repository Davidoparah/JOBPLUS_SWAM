import { useApi } from '../hooks/useApi';

const notifyService = () => {
  const { get } = useApi();

  const getNotifyJobsCount = async (onSuccess) => {
    const count = await get(`notified-jobs-count`, { onSuccess });
    return count;
  };

  return {
    getNotifyJobsCount
  }
}

export default notifyService;