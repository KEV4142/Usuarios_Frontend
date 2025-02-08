import { Routes } from '@angular/router';
import { LoginComponent } from './authorize/login/login.component';
import { NotFoundComponent } from './componentes/not-found/not-found.component';
import { RegistroComponent } from './authorize/registro/registro.component';
import { OlvidePasswordComponent } from './authorize/olvide-password/olvide-password.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'olvidePassword', component: OlvidePasswordComponent },
    { path: '**', component: NotFoundComponent },
  ];
