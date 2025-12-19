import {inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {distinctUntilChanged, fromEvent, tap} from 'rxjs';
import firebase from 'firebase/compat/app';
import Firestore = firebase.firestore.Firestore;
import {RegisterUser} from '../../components/register/register-user/register-user';
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import {AppUser} from '../../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  firestore: Firestore = inject(Firestore);
  lastActivityTimestamp: number = 0;
  autoLogoutTimer: number | null = null;
  currentUserUid: string = '';
  loginBoolean: boolean = false;
  email: string = '';
  samePw: boolean = false;


  constructor(private route: Router, private regUser: RegisterUser) {
    this.startAutoLogoutTimer();
  }

  startAutoLogoutTimer() {
    const timeout = 20 * 60 * 1000; // 20 minutes in milliseconds

    // Create an observable to track user activity
    const userActivityObservable = fromEvent(document, 'mousemove')
      .pipe(
        distinctUntilChanged(), // Ignore consecutive mousemove events
        tap(() => {
          this.lastActivityTimestamp = Date.now(); // Update timestamp on activity
        })
      );

    // Subscribe to the observable and update the timer accordingly
    userActivityObservable.subscribe(() => {
      if (this.autoLogoutTimer) {
        clearTimeout(this.autoLogoutTimer); // Clear existing timer
      }

      this.autoLogoutTimer = setTimeout(() => {
        this.deleteUserIdInLocalStorage();
      }, timeout) as unknown as number;
    });
  }

  deleteUserIdInLocalStorage() {
    localStorage.removeItem('currentUser');
    this.route.navigate(['/']);
  }

  //--------------- register new user -------------------------------------------------
  // TODO: check register logic
  async register() {
    if (this.loginBoolean) {
      const auth = getAuth();
      const password = this.checkPW();
      if (!this.samePw) {
        console.error('Passwords do not match');
        return;
      }
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, this.email, password);
        const user = userCredential.user;
        console.log('###### user ######', user);
        const userData: AppUser = {
          uid: user.uid,
          email: this.regUser.emailFormControl.value!,
          userName: this.regUser.nameFormControl.value!
        }
        await this.createUserInFirestore(userData);
        this.clearUserInputData();
        window.location.reload();
      } catch (error: any) {
        console.error('Registration failed: error.code', error.code);
        console.error('Registration failed: error.message', error.message);
      }
    }
  }

  getUserCollection() {
    return collection(this.firestore as any, 'users');
  }

  async createUserInFirestore(userData: AppUser){
    const docRef = await addDoc(this.getUserCollection(), userData);
    this.currentUserUid = (docRef as any).id;
    localStorage.setItem('currentUser', this.currentUserUid);
    this.route.navigateByUrl('/mainPage');
  }

  clearUserInputData() {
    this.regUser.nameFormControl.reset();
    this.regUser.emailFormControl.reset();
    this.regUser.passwordFormControl.reset();
    this.regUser.passwordFormControl2.reset();
  }

  checkPW(): string {
    const pw1 = this.regUser.passwordFormControl.value;
    const pw2 = this.regUser.passwordFormControl2.value;

    if (!pw1 || !pw2) {
      this.samePw = false;
      return '';
    }

    if (pw1 === pw2) {
      this.samePw = true;
      return pw1;
    }

    this.samePw = false;
    return '';
  }


}
