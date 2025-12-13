import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {environment} from '../environments/environment';

const firebaseConfig = {
  apiKey: environment.API_KEY,
  authDomain: environment.AUTH_DOMAIN,
  projectId: environment.PROJECT_ID,
  storageBucket: environment.STORAGE_BUCKET,
  messagingSenderId: environment.MESSAGING_SENDER_ID,
  appId: environment.APP_ID,
  measurementId: environment.MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
  ]
};
