import {useContext, createContext, useState} from 'react';
import { useCookie } from '../hooks/useCookie';

const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  getLoggedInUserId: null,
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({children}) => {
  const { hasValidAuthCookie, getLoggedInUserId } = useCookie();
  const [isAuthenticated, setIsAuthenticated] = useState(hasValidAuthCookie());

  return (
    <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated, getLoggedInUserId}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;