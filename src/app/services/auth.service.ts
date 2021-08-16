import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

// NGRX
import { AppState } from '../app.reducers';
import { Store } from '@ngrx/store';
import * as authActions from '../auth/auth.actions';

import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { Subscription } from 'rxjs';

interface userFirebaseModel {
  email: string;
  nombre: string;
  uid: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  userSuscription: Subscription;

  constructor(
    public auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store<AppState>

  ) {
    this.userSuscription = new Subscription();
  }

  initAuthListener() {
    this.auth.authState.subscribe((fuser) => {
      if (fuser) {
        this.userSuscription = this.firestore
          .doc(`${fuser.uid}/usuario`)
          .valueChanges()
          .subscribe((firestoreUser: any) => {
            const { email, nombre, uid } = firestoreUser;

            const user = Usuario.fromFirebase(email, nombre, uid);

            this.store.dispatch(authActions.setUser({ user }));
          });
      } else {
        this.userSuscription.unsubscribe();
        this.store.dispatch(authActions.unSetUser());
      }
    });
  }

  crearUsuario(nonbre: string, email: string, password: string) {
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        const usrLocal = user ? user.uid : '';
        const newUser = new Usuario(usrLocal, nonbre, email);

        return this.firestore.doc(`${usrLocal}/usuario`).set({ ...newUser });
      });
  }

  loginUsuario(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }
  logout() {
    return this.auth.signOut();
  }
  isAuth() {
    return this.auth.authState.pipe(map((fbuser) => fbuser !== null));
  }
}
