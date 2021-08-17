import { Component, OnDestroy, OnInit } from '@angular/core';

// ngrx
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducers';
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions';

import { filter, subscribeOn } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit, OnDestroy {
  authSubs: Subscription;
  // al estar anidado se asigna antes
  ingresoEgresoSubs = new Subscription();

  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ) {
    this.authSubs = this.store
      .select('auth')
      .pipe(filter((auth) => auth.user != null))
      .subscribe((user: any) => {
        this.ingresoEgresoSubs = this.ingresoEgresoService
          .initIngresosEgresosListener(user.user.uid)
          .subscribe((ingresoEgresoFB) => {
            this.store.dispatch(
              ingresoEgresoActions.setItems({ items: ingresoEgresoFB })
            );
          });
      });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.ingresoEgresoSubs.unsubscribe();
    this.authSubs.unsubscribe();
  }
}
