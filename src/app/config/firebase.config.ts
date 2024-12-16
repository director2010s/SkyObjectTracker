import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyDxzNV3z5Ur8XUgeZ-RBrptF6-OqzqjJQ4",
  authDomain: "global-sky-object-tracker.firebaseapp.com",
  projectId: "global-sky-object-tracker",
  storageBucket: "global-sky-object-tracker.firebasestorage.app",
  messagingSenderId: "304602460233",
  appId: "1:304602460233:web:37a484dbc74b8fb6d98f98",
  measurementId: "G-MYN3DNK9N9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);