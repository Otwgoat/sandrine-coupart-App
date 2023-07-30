// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';






// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const storageBucket = process.env.REACT_APP_STORAGE_BUCKET;
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIM81rZVI-0NSNKMPei8ahK54nNSguwSk",
  authDomain: "sandrine-coupart.firebaseapp.com",
  projectId: "sandrine-coupart",
  storageBucket: "sandrine-coupart.appspot.com",
  messagingSenderId: "364928884985",
  appId: "1:364928884985:web:8d82bb17f0755b89358228"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
