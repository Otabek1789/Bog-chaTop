import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Replace with your actual Firebase config
// Go to https://console.firebase.google.com/ to create a project
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

// Only initialize if we have a real config, otherwise we'll mock auth for demonstration
const isConfigured = firebaseConfig.apiKey !== "YOUR_API_KEY";

let app, auth, provider;

if (isConfigured) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  provider = new GoogleAuthProvider();
}

export { auth, provider, isConfigured };
