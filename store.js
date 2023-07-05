import { Store } from 'pullstate';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onAuthStateChanged } from 'firebase/auth';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  getAuth
} from 'firebase/auth';
import { app, auth, db } from './firebase-config';
import { collection, addDoc } from 'firebase/firestore';

export const AuthStore = new Store({
  isLoggedIn: false,
  initialized: false,
  user: null,
});

let unsubscribeAuthState;

// Função para definir o usuário autenticado no estado e atualizar o estado de login
const setAuthenticatedUser = async (user) => {
  AuthStore.update((store) => {
    store.user = user;
    store.isLoggedIn = !!user;
    store.initialized = true;
  });

  if (user) {
    const token = await user.getIdToken();
    await AsyncStorage.setItem("authToken", token);
  } else {
    await AsyncStorage.removeItem("authToken");
  }
};


// Função para se inscrever nas alterações do estado de autenticação
const subscribeToAuthStateChanges = () => {
  unsubscribeAuthState = onAuthStateChanged(auth, (user) => {
    console.log('onAuthStateChange', user);
    setAuthenticatedUser(user);
  });
};

// Chamada inicial para se inscrever nas alterações do estado de autenticação
subscribeToAuthStateChanges();

export const appSignIn = async (email, password) => {
  try {
    const resp = await signInWithEmailAndPassword(auth, email, password);
    setAuthenticatedUser(resp.user);
    return { user: resp.user };
  } catch (e) {
    return { error: e };
  }
};

export const appSignOut = async () => {
  try {
    await signOut(auth);
    setAuthenticatedUser(null);
    return { user: null };
  } catch (e) {
    return { error: e };
  }
};

export const appSignUp = async (email, password, displayName) => {
  try {
    const resp = await createUserWithEmailAndPassword(auth, email, password);

    const user = auth.currentUser;
    await updateProfile(user, { displayName });

    // Add user data to Firestore collection 'users'
    const usersCollection = collection(db, 'users');
    await addDoc(usersCollection, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      // Add more user data as needed
    });

    setAuthenticatedUser(user);

    return { user };
  } catch (e) {
    return { error: e };
  }
};

// Função para remover o token de autenticação
const removeAuthToken = async () => {
  try {
    await AsyncStorage.removeItem('authToken');
  } catch (error) {
    console.log('Error removing auth token:', error);
  }
};

// Exportar a função para remover o token de autenticação
export const removeAuth = () => {
  removeAuthToken();
};

// Função para cancelar a inscrição nas alterações do estado de autenticação
export const unsubscribeAuth = () => {
  if (unsubscribeAuthState) {
    unsubscribeAuthState();
  }
};

// Função para recuperar o token de autenticação
const getAuthToken = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    return token;
  } catch (error) {
    console.log('Error getting auth token:', error);
    return null;
  }
};

// Chamada inicial para recuperar o token de autenticação e definir o usuário autenticado
const initAuthenticatedUser = async () => {
  const token = await getAuthToken();
  const auth = getAuth(app);

  if (token) {
    try {
      await auth.signInWithEmailAndPassword("user@example.com", "password");
    } catch (error) {
      console.log('Error initializing authenticated user:', error);
      return { error };
    }
  } else {
    setAuthenticatedUser(null);
    return { user: null };
  }
};

// Chamar a função de inicialização do usuário autenticado ao iniciar o aplicativo
initAuthenticatedUser();
