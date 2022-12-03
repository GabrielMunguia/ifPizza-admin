import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
const firebaseConfig = {
    apiKey: "AIzaSyAgKLkCHeSLA7SuLDfL8q1lBEKscMyUrxk",
    authDomain: "ifpizza.firebaseapp.com",
    databaseURL: "https://ifpizza-default-rtdb.firebaseio.com",
    projectId: "ifpizza",
    storageBucket: "ifpizza.appspot.com",
    messagingSenderId: "255741537301",
    appId: "1:255741537301:web:5d439fea3b1da6d64bb21c",
    measurementId: "G-2B4Y60JWGH"
  };
  const app = initializeApp(firebaseConfig);
    export const db = getDatabase(app);
