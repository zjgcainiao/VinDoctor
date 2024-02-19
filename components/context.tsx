import React,{useContext, useEffect, useState} from 'react';
import { useStorageState } from './useStorageStates';
import { User } from 'firebase/auth';
import { useSegments,useRootNavigation,useRouter } from 'expo-router';

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
    signIn: (e:string, p: string) => Promise<signInResponse>;
    signOut: (e:string,p:string, n:string) => Promise<signOutResponse>;
    session?: string | null;
    user: object | null;
    authInitialized: boolean;
}

const AuthContext = React.createContext<
AuthContextProps | null>(null);




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
interface SessionProviderProps {
    children: React.ReactNode;
    }

export function SessionProvider(props: SessionProviderProps) {
    const [[isLoading, session], setSession] = useStorageState('session');
    const [authInitialized, setAuthInitialized] = React.useState<boolean>(false);

    //create a hook named "useProtectedRoute" that will redirect the user to the login screen if they are not logged in

    const router = useRouter();
    const [isNavigationReady, setIsNavigationReady] = React.useState(false);
    const rootNavigation = useRootNavigation();

  return (
    <AuthContext.SessionProvider
      value={{
        signIn: () => {
          // Perform sign-in logic here
          setSession('xxx');
        },
        signOut: () => {
          setSession(null);
        },
        // session,
        isLoading,
      }}>
      {props.children}
    </AuthContext.SessionProvider>
  );
}
