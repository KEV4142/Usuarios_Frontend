import { Routes } from '@angular/router';
import { LoginComponent } from './authorize/login/login.component';
import { NotFoundComponent } from './componentes/not-found/not-found.component';
import { RegistroComponent } from './authorize/registro/registro.component';
import { OlvidePasswordComponent } from './authorize/olvide-password/olvide-password.component';
import { ReinicioPasswordComponent } from './authorize/reinicio-password/reinicio-password.component';
import { ConfirmarCuentaComponent } from './authorize/confirmar-cuenta/confirmar-cuenta.component';
import { DashboardComponent } from './Paginas/dashboard/dashboard.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'olvidePassword', component: OlvidePasswordComponent },
    { path: 'reinicioPassword', component: ReinicioPasswordComponent },
    { path: 'confirmarCuenta', component: ConfirmarCuentaComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: '**', component: NotFoundComponent },
  ];
