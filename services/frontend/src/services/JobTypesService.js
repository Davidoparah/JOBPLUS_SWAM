import { useApi } from '../hooks/useApi';

const jobTypesService = () => {
  const { get } = useApi();

  const fetchJobTypes = async (onSuccess) => {
    const jobTypes = await get('job-types', { onSuccess });
    return jobTypes;
  }

  return {
    fetchJobTypes,
  }
}

export default jobTypesService;