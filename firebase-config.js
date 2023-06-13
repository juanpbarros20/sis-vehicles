import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBxMuOjJubaPLPSONsYpuVVcDVtkGkruIU",
  authDomain: "app-veiculos-16c3e.firebaseapp.com",
  projectId: "app-veiculos-16c3e",
  storageBucket: "app-veiculos-16c3e.appspot.com",
  messagingSenderId: "487218248391",
  appId: "1:487218248391:web:d449540e35653bf5f41ce2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Definir persistência como armazenamento local (browserLocalPersistence)
setPersistence(auth, browserLocalPersistence);

export { app, auth, db };
