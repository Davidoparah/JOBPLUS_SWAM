import { useApi } from '../hooks/useApi';

const profileService = () => {
  const { post, get } = useApi();

  const fetchProfile = async (onSuccess) => {
    const profile = await get(`profile`, { onSuccess });
    return profile;
  }

  const saveProfile = async (data, onSuccess) => {
    await post(`profile`, { data, onSuccess });
  }

  return {
    fetchProfile,
    saveProfile,
  };
};

export default profileService;