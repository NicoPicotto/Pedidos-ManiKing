import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD095TeEkiRq5cdboL7Hs6Km19Q6rck2AQ",
    authDomain: "pedidos-mk.firebaseapp.com",
    projectId: "pedidos-mk",
    storageBucket: "pedidos-mk.appspot.com",
    messagingSenderId: "50920084154",
    appId: "1:50920084154:web:fab5d80ea943faa3eee883"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
