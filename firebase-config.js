import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configurações do seu projeto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBxMuOjJubaPLPSONsYpuVVcDVtkGkruIU",
  authDomain: "app-veiculos-16c3e.firebaseapp.com",
  projectId: "app-veiculos-16c3e",
  storageBucket: "app-veiculos-16c3e.appspot.com",
  messagingSenderId: "487218248391",
  appId: "1:487218248391:web:d449540e35653bf5f41ce2"
};

// Inicialize o app Firebase
const app = initializeApp(firebaseConfig);

// Obtenha as instâncias dos serviços necessários
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
