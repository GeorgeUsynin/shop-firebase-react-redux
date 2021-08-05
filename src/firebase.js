import firebase from 'firebase';

const firebaseConfig = {
    apiKey: 'AIzaSyAyeMIqCDCcV7dYMhWl-mPgKxEU-cFb5RQ',
    authDomain: 'shop-a10c2.firebaseapp.com',
    databaseURL: 'https://shop-a10c2-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'shop-a10c2',
    storageBucket: 'shop-a10c2.appspot.com',
    messagingSenderId: '169944780170',
    appId: '1:169944780170:web:6871faa9413ce774044c73',
    measurementId: 'G-96WHHNW2GJ'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const fireStorage = firebase.storage()
const db = firebase.firestore()

export {fireStorage, db}
