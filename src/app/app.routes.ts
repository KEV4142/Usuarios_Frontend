import { Routes } from '@angular/router';
import { LoginComponent } from './authorize/login/login.component';
import { NotFoundComponent } from './componentes/not-found/not-found.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: '**', component: NotFoundComponent },
  ];
