import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCbhd8jVjDvkoH3mR5P3m_eE4AVPzLy9_4",
  authDomain: "bookshelf-e-books.firebaseapp.com",
  projectId: "bookshelf-e-books",
  storageBucket: "bookshelf-e-books.appspot.com",
  messagingSenderId: "407715507143",
  appId: "1:407715507143:web:339cfb6a9a04804d6307e2",
  measurementId: "G-ML262M2Y1X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);