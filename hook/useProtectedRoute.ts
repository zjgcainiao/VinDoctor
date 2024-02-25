// useProtectedRoute.js or useProtectedRoute.ts
import { useAuth } from '../app/auth/authContext';
import { useEffect } from 'react';
import { useNavigation, useRouter } from 'expo-router';

// automatically redirect to login screen if not logged in
export const useProtectedRoute = () => {
  const { user, authInitialized } = useAuth();
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    if (authInitialized && !user) {
      // Redirect to login screen if not logged in
      router.push('/SignInScreen');
    }
  }, [user, authInitialized, navigation]);
};

// export default useProtectedRoute;
