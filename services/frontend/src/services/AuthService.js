import { useApi } from '../hooks/useApi';

const authService = () => {
  const { post } = useApi();

  const registerUser = async (userData, onSuccess, onFailure) => {
    await post('auth/local/register', {
      data: userData,
      onSuccess: onSuccess,
       onFailure: onFailure
    });
  };

  const loginUser = async (credentials, onSuccess, onFailure) => {
    await post('auth/local', {
      data: credentials,
      onSuccess: onSuccess,
      onFailure: onFailure
    });
  };

  const forgotPassword = async (email, onSuccess, onFailure) => {
    await post('auth/forgot-password', {
      data: { email },
      onSuccess: onSuccess,
      onFailure: onFailure
    });
  };

  const resetPassword = async (passwordConfirmation, password, code, onSuccess, onFailure) => {
    await post('auth/reset-password', {
      data: { passwordConfirmation, password, code },
      onSuccess: onSuccess,
      onFailure: onFailure
    });
  };

  return {
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword
  }
};

export default authService;