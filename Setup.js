import * as React from 'react';
import App from './App';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyATwCLFhGHMUdutRMkHEvtHnJ4pZhO3N4k",
  authDomain: "echat-a1869.firebaseapp.com",
  databaseURL: "https://echat-a1869.firebaseio.com",
  projectId: "echat-a1869",
  storageBucket: "echat-a1869.appspot.com",
  messagingSenderId: "782710091116",
  appId: "1:782710091116:web:0c17b5d32c4844a2519749",
  measurementId: "G-X0XC3PDPNY"
};

if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    //console.log('now fire here!');
}

export {firebase, auth, database, firestore};

const Setup = () => {
    return (
        <App />
    );
}

export default Setup;