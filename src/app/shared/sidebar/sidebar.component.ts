import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { authReducer } from 'src/app/auth/auth.reducers';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit, OnDestroy {
  userName: string | undefined;
  userSubs: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.userSubs = this.store
      .select('auth')
      .subscribe((aut) => {
        this.userName = aut.user?.nombre
      });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.userSubs.unsubscribe();
  }

  logout() {
    Swal.fire({
      title: 'Espere por favor',
      didOpen: () => {
        Swal.showLoading();
      },
    });

    this.authService
      .logout()
      .then(() => {
        Swal.close();
        this.router.navigate(['/login']);
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        });
      });
  }
}
