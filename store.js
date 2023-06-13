import { Store, registerInDevtools } from 'pullstate';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
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
const setAuthenticatedUser = (user) => {
  AuthStore.update((store) => {
    store.user = user;
    store.isLoggedIn = !!user;
    store.initialized = true;
  });
};

// Função para se inscrever nas alterações do estado de autenticação
const subscribeToAuthStateChanges = () => {
  unsubscribeAuthState = onAuthStateChanged(auth, (user) => {
    console.log('onAuthStateChange', user);
    setAuthenticatedUser(user);
  });
};

// Função para interromper a inscrição nas alterações do estado de autenticação
const unsubscribeFromAuthStateChanges = () => {
  if (unsubscribeAuthState) {
    unsubscribeAuthState();
  }
};

// Chamada inicial para se inscrever nas alterações do estado de autenticação
subscribeToAuthStateChanges();

export const appSignIn = async (email, password) => {
  try {
    if (auth.currentUser) {
      // Se o usuário já está autenticado, retorne as informações do usuário atual
      return { user: auth.currentUser };
    }

    const resp = await signInWithEmailAndPassword(auth, email, password);
    setAuthenticatedUser(resp.user);
    return { user: auth.currentUser };
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

registerInDevtools({ AuthStore });
