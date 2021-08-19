import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { Store } from '@ngrx/store';
import * as ui from '../shared/ui.actions';
import { Subscription } from 'rxjs';
import { AppStateWhitIngreso } from './ingreso-egreso.reducers';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [],
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  ingresoEgresoForm: FormGroup;
  tipo: string = 'ingreso';
  cargando = false;
  uiSuscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppStateWhitIngreso>
  ) {
    this.ingresoEgresoForm = this.fb.group({
      description: ['', [Validators.required]],
      monto: ['', [Validators.required, Validators.min(0)]],
    });

    this.uiSuscription = this.store.select('ui').subscribe((ui) => {
      this.cargando = ui.isLoading;
    });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.uiSuscription.unsubscribe();
  }

  guardar() {
    if (this.ingresoEgresoForm.invalid) return;

    this.store.dispatch(ui.isLoading());
    const { monto, description } = this.ingresoEgresoForm.value;

    const ingresoEgreso = new IngresoEgreso(description, monto, this.tipo);

    this.ingresoEgresoService
      .crearIngresoEgreso(ingresoEgreso)
      .then(() => {
        this.store.dispatch(ui.stopLoading());
        this.ingresoEgresoForm.reset();
        Swal.fire('Registro creado', description, 'success');
      })
      .catch((err) => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire('Error', err.message, 'error');
      });
  }
}
