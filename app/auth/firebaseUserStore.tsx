import { Store, registerInDevtools } from "pullstate";
import auth from '@react-native-firebase/auth';
import {useEffect} from 'react';
import { useRouter } from 'expo-router';
import { router } from "expo-router";
// import router from '../../../smart_home_hub/frontend/smart_home_hub_vue/src/router/index';
import User  from '@react-native-firebase/auth';
import { Alert } from "react-native";

// export interface UserMetadata {
//     // Define the properties of UserMetadata
//     creationTime: string|null;
//     lastSignInTime: string|null;
//   }
  
  export interface FirebaseUser {
    uid: string;
    displayName: string|null;
    email: string|null;
    emailVerified: boolean;
    photoURL: string|null;
    phoneNumber: string|null;
    isAnonymous: boolean;
    providerId: string|null;
    // metadata: UserMetadata|null;
  }
  
  export interface storeInterface {
    // isDarkMode: boolean;
    isLoggedIn: boolean;
    isInitialized: boolean;
    user: FirebaseUser| null;
    token: string | null;
    uid: string | null;  
  };
  
export const firebaseUserStore = new Store<storeInterface>({
    // isDarkMode: true,
    isLoggedIn: false,
    isInitialized: false,
    user: null,
    token: null,
    uid: null,
});

export const firebaseUnsubscribed = auth().onAuthStateChanged((user) => {
    console.log("User status changed: ", user);
    // const user = auth().currentUser;
    const token = user?.getIdToken();
    firebaseUserStore.update((store: storeInterface) => {
        store.isInitialized = true;
        store.isLoggedIn = user ? true : false;  // if user is null, then false, else true
        store.user = user;
        store.token = token;
        store.uid = user?.uid;
        // store.isDarkMode = true;
    });
});

const firebasePhoneSignIn = async (phoneNumber: string) => {

    try {
        const confirmationResult = await auth().signInWithPhoneNumber(phoneNumber);
        return { confirmationResult: confirmationResult, error: null };
    } catch (error) {
        console.log("signIn error", error);
        Alert.alert("Error", "Phone sign-in failed.");
        return { confirmationResult: null, error: error };
    }
};

export const firebaseSignIn = async (email: string, password: string) => {
    try {
        // signInWithEmailAndPassword is directly called on the auth() returned object.
       auth().signInWithEmailAndPassword(email, password)
       .then(()=>{
            console.log('Sign-in successful');
            const user = auth().currentUser;
            const token = user ? user.getIdToken() : null;
            const uid = user ? user.uid : null;
            console.log("signIn firebase User:", user,'token:', token);

            firebaseUserStore.update((store: storeInterface) => {
                store.isInitialized = user ? true : false;
                store.isLoggedIn = user ? true : false;
                store.user = user ? {
                    uid: user.uid,
                    displayName: user.displayName ?? null,
                    email: user.email ?? null,
                    emailVerified: user.emailVerified,
                    photoURL: user.photoURL ?? null,
                    phoneNumber: user.phoneNumber ?? null,
                    isAnonymous: user.isAnonymous,
                    providerId: user.providerId ?? null,
                  } : null;
                store.token = token;
                store.uid = uid;
              });

        })
        .catch(error=>{

            if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
            } else if (error.code === 'auth/user-not-found') {
                console.log('No user found with that email address.');
            } else if (error.code === 'auth/email-already-in-use') {
                console.log('This email is already in use!');
            } else {
                console.log('Error:', error.message);
            }
        });
        return { user: auth().currentUser, error: null };
    } catch (error) {
        console.log("signIn error", error);
        return { user: null, error: error };
    };
};

export const firebaseSignUp = async (email: string, password: string, displayName: string) => {
    try {
        // this will trigger onAuthStateChange to update the store.
        auth().createUserWithEmailAndPassword(email, password)
        .then(()=>{
        console.log('Sign-up successful');
        const user = auth().currentUser;
        const token = user ? user.getIdToken() : null;
        const uid = user ? user.uid : null;
        console.log("New firebase User:", user,'token:', token);

        console.log("signUp A new user ", user);
        firebaseUserStore.update((store: storeInterface) => {
            store.isInitialized = user ? true : false;
            store.isLoggedIn = true;
            store.user = user;
            store.token = user.getIdToken();
            store.uid = user.uid;
        });
        })
        .catch(error=>{

            if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
            } else {
                console.log('Error:', error.message);
            }
        });
        return { user: auth.currentUser, error: null };
    } catch (error) {
        console.log("signUp error", error);
        return { user: null, error: error }
    }
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ;

export const firebaseSignOut = async () => {
    const router = useRouter();
    try {
        auth().signOut().then(()=>{
        console.log("signOut");
        firebaseUserStore.update((store: storeInterface) => {
            store.isLoggedIn = false;
            store.user = null;
            store.token = null;
            store.uid = null;
            });
        });
        router.push("/");
        return { user: null, error: null };
    } catch (error) {
        console.log("signOut error", error);
        return { user: null, error: error };
    }
};
// registerInDevtools({ firebaseUserStore });

