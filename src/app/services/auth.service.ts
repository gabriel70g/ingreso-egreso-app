import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    public auth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  initAuthListener() {
    this.auth.authState.subscribe((fuser) => {
      console.log(fuser);
    });
  }

  crearUsuario(nonbre: string, email: string, password: string) {
    //console.log(nonbre, email, password);

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
