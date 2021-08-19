import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { DashboardComponent } from '../dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { DetalleComponent } from './detalle/detalle.component';
import { OrdenIngresoPipe } from '../pipes/orden-ingreso.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';
import { StoreModule } from '@ngrx/store';
import { ingresoEgresoReducer } from './ingreso-egreso.reducers';



@NgModule({
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    OrdenIngresoPipe,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('ingresoEgreso',ingresoEgresoReducer),
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    DashboardRoutesModule,
  ],
})
export class IngresoEgresoModule {}
