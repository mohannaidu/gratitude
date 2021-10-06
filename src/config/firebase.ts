import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import config from './config';

const firebaseStore = firebase.initializeApp(config.firebase);

export const Providers = {
    google: new firebase.auth.GoogleAuthProvider(),
};

export const auth = firebase.auth();
export const db = firebaseStore.firestore();//firebase.database().ref("users");
