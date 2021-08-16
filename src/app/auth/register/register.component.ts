import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import * as ui from '../../shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit, OnDestroy {
  registroForm: FormGroup;
  cargando = false;
  uiSuscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.uiSuscription = this.store
      .select('ui')
      .subscribe((ui) => (this.cargando = ui.isLoading));
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.uiSuscription.unsubscribe();
  }

  crearUsuario() {
    if (this.registroForm.invalid) {
      return;
    }

    this.store.dispatch(ui.isLoading());

    // Swal.fire({
    //   title: 'Espere por favor',
    //   didOpen: () => {
    //     Swal.showLoading();
    //   },
    // });

    const { nombre, correo, password } = this.registroForm.value;
    this.authService
      .crearUsuario(nombre, correo, password)
      .then((credenciales) => {
        console.log(credenciales);
        // Swal.close();
        this.store.dispatch(ui.stopLoading());
        this.router.navigate(['/']);
      })
      .catch((err) => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        });
      });
  }

  setBackGroundColor() {
    return 'backgroundcolor: green';
  }
}
