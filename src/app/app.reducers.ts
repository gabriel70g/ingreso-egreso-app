import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducers';
import * as ingresoEgreso from './ingreso-egreso/ingreso-egreso.reducers';
export interface AppState {
  ui: ui.State;
  auth: auth.State;
  // ingresoEgreso: ingresoEgreso.State;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
  auth: auth.authReducer,
  // ingresoEgreso: ingresoEgreso.ingresoEgresoReducer,
};
