import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDEnvNcMjmNdznZPYCBUCcPtUEP2mYDH6U",
    authDomain: "viauteq.firebaseapp.com",
    databaseURL: "https://viauteq-default-rtdb.firebaseio.com",
    projectId: "viauteq",
    storageBucket: "viauteq.firebasestorage.app",
    messagingSenderId: "228642958731",
    appId: "1:228642958731:web:618bdc3365f09817b9538e",
    measurementId: "G-F054VM89CQ"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
