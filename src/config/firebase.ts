import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import config from './config';

const FirebaseStore = firebase.initializeApp(config.firebase);

export const Providers = {
    google: new firebase.auth.GoogleAuthProvider(),
};

export const auth = firebase.auth();
export const db = firebase.database();
