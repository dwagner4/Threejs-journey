import './style.css'
import Experience from './Experience/Experience.js'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApwiY81pLIWjBh0tbrr3fl7XDZ16p8Jfw",
  authDomain: "port-one-70b60.firebaseapp.com",
  projectId: "port-one-70b60",
  storageBucket: "port-one-70b60.appspot.com",
  messagingSenderId: "205564157125",
  appId: "1:205564157125:web:6714b825a5a41e1f52e4ac"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



const experience = new Experience(document.querySelector('canvas.webgl'))
window.experience = experience
experience.start()

