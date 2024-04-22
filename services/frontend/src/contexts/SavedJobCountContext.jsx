import {useContext, createContext, useState, useEffect} from 'react';
import savedJobService from '../services/SavedJobService';
import { useAuth } from './AuthContext';

const SavedJobCountContext = createContext();

export const useSavedJobCount = () => useContext(SavedJobCountContext);

const SavedJobCountProvider = ({children}) => {
  const [savedJobCount, setSavedJobCount] = useState(0);
  
  const { getSavedJobsCount } = savedJobService();
  const { getLoggedInUserId } = useAuth();

  useEffect(() => {
    const fetchSavedJobCount = async () => {
      const userId = getLoggedInUserId();
      await getSavedJobsCount(userId, (res) => {
        setSavedJobCount(res.data);
      });
    }
    fetchSavedJobCount();
  },[]);

  // increment function
  const incrementSavedJobCount = () => { setSavedJobCount( prevCount => prevCount + 1)};
  // decrement function
  const decrementSavedJobCount = () => { setSavedJobCount( prevCount => prevCount - 1)};

  return (
    <SavedJobCountContext.Provider value={{ savedJobCount, incrementSavedJobCount, decrementSavedJobCount }}>
      {children}
    </SavedJobCountContext.Provider>
  );
}

export default SavedJobCountProvider;