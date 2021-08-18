import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

// import { ChartType } from 'chart.js';
// import { MultiDataSet, Label } from 'ng2-charts';

import { AppState } from 'src/app/app.reducers';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [],
})
export class EstadisticaComponent implements OnInit {
  ingresos = 0;
  egresos = 0;
  totalIngresos = 0;
  totalEgresos = 0;

  // public doughnutChartLabels: Label[] = [
  //   'Download Sales',
  //   'In-Store Sales',
  //   'Mail-Order Sales',
  // ];
  // public doughnutChartData: MultiDataSet = [
  //   [350, 450, 100],
  //   [50, 150, 120],
  //   [250, 130, 70],
  // ];
  // public doughnutChartType: ChartType = 'doughnut';

  constructor(private store: Store<AppState>) {
    this.store
      .select('ingresoEgreso')
      .subscribe(({ items }) => this.generarEstadistica(items));
  }

  ngOnInit(): void {}

  generarEstadistica(items: IngresoEgreso[]) {

      this.ingresos = 0;
      this.egresos = 0;
      this.totalIngresos = 0;
      this.totalEgresos = 0;

    for (const item of items) {
      if (item.tipo === 'ingreso') {
        this.totalIngresos += item.monto;
        this.ingresos++;
      } else {
        this.totalEgresos += item.monto;
        this.egresos++;
      }
    }
  }
}
