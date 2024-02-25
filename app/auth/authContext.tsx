import React,{useContext, useEffect, useState} from 'react';
import { useStorageState } from './useStorageStates';
import { useSegments,useRootNavigation,useRouter } from 'expo-router';
import {useAuthStatus} from '../../hook/useAuthStatus';
import {firebaseSignIn, firebaseSignUp, firebaseSignOut, firebasePhoneSignIn } from './firebaseUserStore';
import { User } from 'firebase/auth';
// define a singInResponse interface
interface signInResponse {
    user: User | null;
    error: string | null;
}

// define a signOutResponse interface
interface signOutResponse {
    user: {} | null;
    error: string | null;
}

//creating interface for AuthContext
interface AuthContextProps {
    signIn: (email: string, password: string) => Promise<signInResponse>;
    signOut: () => Promise<signOutResponse>;
    user: User | null;
    authInitialized: boolean | null;
}

const AuthContext = React.createContext<AuthContextProps | null>(null);

export const useAuth = () => useContext(AuthContext);
// export function useSession() {
//   const value = React.useContext(AuthContext);
//   if (process.env.NODE_ENV !== 'production') {
//     if (!value) {
//       throw new Error('useSession must be wrapped in a <SessionProvider />');
//     }
//   }

//   return value;
// };

// sessionProvider interface
// interface SessionProviderProps {
//     children: React.ReactNode;
//     }

export const AuthContextProvider:React.FC<{children: React.ReactNode}> = ({children}) => {
  const [authInitialized, setAuthInitialized] = React.useState<boolean>(false);
  const { user, isLoggedIn } = useAuthStatus();

  useEffect(() => {
    // Simulating an async operation like fetching session data
    const initializeAuth = async () => {
      setAuthInitialized(true); // Assuming auth is initialized here
    };
    initializeAuth();
  }, []);
  
  //create a hook named "useProtectedRoute" that will redirect the user to the login screen if they are not logged in
  const router = useRouter();
  const [isNavigationReady, setIsNavigationReady] = React.useState(false);
  const rootNavigation = useRootNavigation();

  return (
    <AuthContext.Provider
      value={{
        signIn: firebaseSignIn,
        signOut: firebaseSignOut,
        user: isLoggedIn ? user : null,
        authInitialized:authInitialized,
        }} 
      >
      {children}
    </AuthContext.Provider>
  );
};
