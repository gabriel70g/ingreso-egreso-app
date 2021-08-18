import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class IngresoEgresoService {
  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {}

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    const uidUser = this.authService.userID;

    // se quita el campo (uid) para que no
    // explote por los aires al querer agregar
    const { uid, ...ingEgre } = ingresoEgreso;

    return this.firestore
      .doc(`${uidUser}/ingreso-egreso`)
      .collection('items')
      .add({ ...ingEgre });
  }
  initIngresosEgresosListener(uid: string) {
    return this.firestore
      .collection(`${uid}/ingreso-egreso/items`)
      .snapshotChanges()
      .pipe(
        map((snapshop) => {
          return snapshop.map((doc) => {
            return {
              uid: doc.payload.doc.id,
              ...(doc.payload.doc.data() as any),
            };
          });
        })
      );
  }
  borrarIngresoEgresoItem(uidItem: string) {
    const uidUser = this.authService.userID;

    return this.firestore.doc(
      `${uidUser}/ingreso-egreso/items/${uidItem}`
    ).delete();

  }
}
