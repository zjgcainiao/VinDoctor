import { Store, registerInDevtools } from "pullstate";
import { firebase_auth, firebase_app } from "./firebaseConfig";
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    updateProfile,
    User,
    updateCurrentUser,
    updateEmail,
    updatePassword,
    updatePhoneNumber

} from "firebase/auth";

interface storeInterface {
    // isDarkMode: boolean;
    isLoggedIn: boolean;
    isInitialized: boolean;
    user: User | null;
};
//initated via firebaseConfig.ts in config folder
const auth = firebase_auth;

const firebaseUserStore = new Store<storeInterface>({
    // isDarkMode: true,
    isLoggedIn: false,
    isInitialized: false,
    user: null,
});

const firebaseUnsubscribed = onAuthStateChanged(auth, (user) => {
    console.log("onAuthStateChanged", user);
    firebaseUserStore.update((store: storeInterface) => {
        store.isInitialized = true;
        store.isLoggedIn = user ? true : false;  // if user is null, then false, else true
        store.user = user;
        // store.isDarkMode = true;
    });
});


const firebaseSignIn = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("signIn", user);
        firebaseUserStore.update((store: storeInterface) => {
            store.isLoggedIn = user ? true : false;
            store.user = user;
        });
        return { user: auth.currentUser, error: null };
    } catch (error) {
        console.log("signIn error", error);
        return { user: null, error: error };
    }
};

const firebaseSignUp = async (email: string, password: string, displayName: string) => {
    try {
        // this will trigger onAuthStateChange to update the store.
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        // add the displayName
        await updateProfile(user, { displayName: displayName });

        console.log("signUp new user ", user);
        firebaseUserStore.update((store: storeInterface) => {
            store.isLoggedIn = true;
            store.user = user

        });
        return { user: auth.currentUser, error: null };
    } catch (error) {
        console.log("signUp error", error);
        return { user: null, error: error }
    }
};

const firebaseSignOut = async () => {
    try {
        await signOut(auth);
        console.log("signOut");
        firebaseUserStore.update((store: storeInterface) => {
            store.isLoggedIn = false;
            store.user = null;
        });
        return { user: null, error: null };
    } catch (error) {
        console.log("signOut error", error);
        return { user: null, error: error };
    }
};
registerInDevtools({ firebaseUserStore });

export { firebaseUserStore, firebaseSignIn, firebaseSignUp, firebaseSignOut, firebaseUnsubscribed };