import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCwgxA1XA5Y0ZMHSq9k5WpllamprjuGJB4",
  authDomain: "pruebaviauteq.firebaseapp.com",
  databaseURL: "https://pruebaviauteq-default-rtdb.firebaseio.com",
  projectId: "pruebaviauteq",
  storageBucket: "pruebaviauteq.firebasestorage.app",
  messagingSenderId: "1062143906734",
  appId: "1:1062143906734:web:b16459a1fd3beec1ef2e3f"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
