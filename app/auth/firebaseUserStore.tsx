import { Store, registerInDevtools } from "pullstate";
import auth from '@react-native-firebase/auth';

interface storeInterface {
    // isDarkMode: boolean;
    isLoggedIn: boolean;
    isInitialized: boolean;
    user: User | null;
    token: string | null;
    uid: string | null;  
};



const firebaseUserStore = new Store<storeInterface>({
    // isDarkMode: true,
    isLoggedIn: false,
    isInitialized: false,
    user: null,
    token: null,
    uid: null,
});

const firebaseUnsubscribed = auth().onAuthStateChanged((user) => {
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

const firebaseSignIn = async (email: string, password: string) => {
    try {
        // signInWithEmailAndPassword is directly called on the auth() returned object.
       auth().signInWithEmailAndPassword(email, password)
       .then(()=>{
            console.log('Sign-in successful');
            user = auth().currentUser;
            const token = user ? user.getIdToken() : null;
            const uid = user ? user.uid : null;
            console.log("signIn firebase User:", user,'token:', token);

            firebaseUserStore.update((store: storeInterface) => {
                store.isInitialized = user ? true : false;
                store.isLoggedIn = user ? true : false;
                store.user = user;
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

const firebaseSignUp = async (email: string, password: string, displayName: string) => {
    try {
        // this will trigger onAuthStateChange to update the store.
        const userCredential = await auth().createUserWithEmailAndPassword( email, password);
        const user = userCredential.user;
        // add the displayName
        await updateProfile(user, { displayName: displayName });

        console.log("signUp new user ", user);
        firebaseUserStore.update((store: storeInterface) => {
            store.isInitialized = user ? true : false;
            store.isLoggedIn = true;
            store.user = user;
            store.token = user.getIdToken();
            store.uid = user.uid;

        });
        return { user: auth.currentUser, error: null };
    } catch (error) {
        console.log("signUp error", error);
        return { user: null, error: error }
    }
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ;

const firebaseSignOut = async () => {
    try {
        await auth().signOut();
        console.log("signOut");
        firebaseUserStore.update((store: storeInterface) => {
            store.isLoggedIn = false;
            store.user = null;
            store.token = null;
            store.uid = null;
        });
        return { user: null, error: null };
    } catch (error) {
        console.log("signOut error", error);
        return { user: null, error: error };
    }
};
// registerInDevtools({ firebaseUserStore });

export { firebaseUserStore, firebaseSignIn, firebaseSignUp, firebaseSignOut, firebaseUnsubscribed, firebasePhoneSignIn};