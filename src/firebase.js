import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBzYX8WE3LNiyQNrsil99X-e72yoKrJLds",
  authDomain: "vocabulary-cards-a3447.firebaseapp.com",
  projectId: "vocabulary-cards-a3447",
  storageBucket: "vocabulary-cards-a3447.appspot.com",
  messagingSenderId: "845588216609",
  appId: "1:845588216609:web:6305aab2e70800732c1c60",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore();
const colRef = collection(db, "cards");

export {
  colRef,
  db,
  getDocs,
  addDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  deleteDoc,
  doc,
};
