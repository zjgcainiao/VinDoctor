// hooks/useAuthStatus.js or useAuthStatus.ts if using TypeScript
import { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';

export const useAuthStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setIsLoggedIn(true);
        setUser(currentUser);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return { isLoggedIn, user };
};

// export default useAuthStatus;
