import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducers';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [],
})
export class DetalleComponent implements OnInit, OnDestroy {
  ingresoEgresos: IngresoEgreso[] = [];
  ingresosEgresosSubs: Subscription;

  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ) {
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

  borrar(uidItem: string | undefined) {
    if (!uidItem) {
      return;
    }

    this.ingresoEgresoService
      .borrarIngresoEgresoItem(uidItem)
      .then(() => {
        Swal.fire('Borrado', 'Item borrado!', 'success');
      })
      .catch((err) => {
        Swal.fire('Error', err.message, 'error');
      });
  }
}
