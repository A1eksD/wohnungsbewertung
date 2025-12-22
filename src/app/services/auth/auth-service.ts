import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { fromEvent, merge, tap, throttleTime} from 'rxjs';
import { doc, updateDoc, setDoc } from 'firebase/firestore';
import { AppUser} from '../../interfaces/user';
import { RegisterDTO } from '../../interfaces/register-dto';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  lastActivityTimestamp: number = 0;
  autoLogoutTimer: number | null = null;
  currentUserUid: string | undefined  = '';
  errorMessage: string = '';
  currentUser: string = '';
  auth = inject(Auth);
  firestore = inject(Firestore);

  constructor(private route: Router) {
    this.startAutoLogoutTimer();
  }

  startAutoLogoutTimer() {
    const timeout = 20 * 60 * 1000;

    const activity$ = merge(
        fromEvent(document, 'mousemove'),
        fromEvent(document, 'keydown'),
        fromEvent(document, 'click'),
        fromEvent(document, 'touchstart'),
        fromEvent(document, 'scroll'),
      ).pipe(
      throttleTime(1000),
      tap(() => this.lastActivityTimestamp = Date.now())
    );

    activity$.subscribe(() => {
      if (this.autoLogoutTimer) clearTimeout(this.autoLogoutTimer);

      this.autoLogoutTimer = window.setTimeout(() => {
        this.deleteUserIdInLocalStorage();
      }, timeout);
    });
  }


  deleteUserIdInLocalStorage() {
    localStorage.removeItem('currentUser');
    this.route.navigate(['/']);
  }

  //--------------- register new user -------------------------------------------------
  async register(data: RegisterDTO): Promise<void> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, data.email, data.password);

      const userData: AppUser = {
        uid: userCredential.user.uid,
        email: data.email,
        userName: data.name
      };

      await this.createUserInFirestore(userData);
      console.log('Registration successful!');
      this.route.navigateByUrl('/');
    } catch (error: any) {
      console.error('Registration failed:', error.code);
      this.errorMessage = error.code === 'auth/email-already-in-use'
        ? 'Diese E-Mail ist bereits registriert.'
        : 'Fehler bei der Registrierung.';
      throw error;
    }
  }

  async createUserInFirestore(userData: AppUser) {
    if (!userData.uid) throw new Error("Keine UID vorhanden");
    const userDocRef = doc(this.firestore, 'users', userData.uid);
    await setDoc(userDocRef, userData);

    this.currentUserUid = userData.uid;
    localStorage.setItem('currentUser', userData.uid);
  }

  //--------------- login -------------------------------------------------
  // TODO: test login
  async login(data: RegisterDTO) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, data.email, data.password);
      const user = userCredential.user;
      const userDocRef = doc(this.firestore, 'users', user.uid);
      await updateDoc(userDocRef, { status: true });
      this.currentUserUid = user.uid;
      localStorage.setItem('currentUser', user.uid);

      this.startAutoLogoutTimer();
      this.route.navigateByUrl('/');

    } catch (error: any) {
      this.switchCase(error.code);
    }
  }

  async updateUserOnlineStatus(userId: string) {
    const userDocRef = doc(this.firestore, 'users', userId);
    await updateDoc(userDocRef, { status: true });
  }

  async getUserIdInLocalStorage(userId: string) {
    const currentUserFromStorage = localStorage.getItem('currentUser');
    if (!currentUserFromStorage) {
      localStorage.setItem('currentUser', userId);
      await this.updateUserOnlineStatus(userId);
    }
  }

  switchCase(errorCode: string) {
    switch (errorCode) {
      case 'auth/invalid-credential':
        this.errorMessage =
          '*Invalid credentials. Please check your entries.';
        break;
      case 'auth/too-many-requests':
        this.errorMessage =
          '*Access to this account has been temporarily disabled due to numerous failed login attempts.';
        break;
      default:
        this.errorMessage = '*Please check your entries.';
        break;
    }
  }
}
