import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { environment} from '../environments/environment';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {provideFirebaseApp} from '@angular/fire/app';
import {provideAnalytics} from '@angular/fire/analytics';
import {provideFirestore} from '@angular/fire/firestore';
import {provideAuth} from '@angular/fire/auth';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideAnalytics(() => getAnalytics())
  ]
};
