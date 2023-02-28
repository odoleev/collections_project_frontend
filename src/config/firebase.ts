import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyAmRSWD_h2O4rswspQz4uQv-tLrvK-bIWs',
  authDomain: 'collections-bc615.firebaseapp.com',
  projectId: 'collections-bc615',
  storageBucket: 'collections-bc615.appspot.com',
  messagingSenderId: '424542453873',
  appId: '1:424542453873:web:e91cf02fa5b2516c3e5bd0',
  measurementId: 'G-L73VSBF0MF',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
