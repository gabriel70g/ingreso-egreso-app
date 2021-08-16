import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AppState } from 'src/app/app.reducers';
import * as ui from '../../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  cargando = false;
  uiSuscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.loginForm = this.fb.group({
      email: ['ga@ga.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required]],
    });

    this.uiSuscription = this.store.select('ui').subscribe((ui) => {
      this.cargando = ui.isLoading;
      console.log('cargando subs');
    });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.uiSuscription.unsubscribe();
  }

  loginUsuario() {
    if (this.loginForm.invalid) return;

    this.store.dispatch(ui.isLoading());

    // Swal.fire({
    //   title: 'Espere por favor',
    //   didOpen: () => {
    //     Swal.showLoading();
    //   },
    // });

    const { email, password } = this.loginForm.value;

    this.authService
      .loginUsuario(email, password)
      .then((resp) => {
        console.log(resp);
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
}
