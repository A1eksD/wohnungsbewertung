import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import {initializeApp} from 'firebase/app';
import {getAnalytics, isSupported} from 'firebase/analytics';
import { environment } from './environments/environment';

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
const appFirebase = initializeApp(firebaseConfig);

// Initialize Analytics only if supported (browser environments)
if (typeof window !== 'undefined') {
  isSupported()
    .then((supported) => {
      if (supported) {
        getAnalytics(appFirebase);
      }
    })
    .catch(() => {});
}

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
