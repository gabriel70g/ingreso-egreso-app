import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducers';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [],
})
export class DetalleComponent implements OnInit, OnDestroy {
  ingresoEgresos: IngresoEgreso[] = [];
  ingresosEgresosSubs: Subscription;

  constructor(private store: Store<AppState>) {
    this.ingresosEgresosSubs = this.store
      .select('ingresoEgreso')
      .subscribe(({ items }) => {
        this.ingresoEgresos = items;
      });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.ingresosEgresosSubs.unsubscribe();
  }

  borrar(uid: string | undefined) {
    console.log(uid);
  }
}
