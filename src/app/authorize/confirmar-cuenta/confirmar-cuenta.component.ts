import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-confirmar-cuenta',
  imports: [CommonModule,MatProgressSpinnerModule,RouterLink],
  templateUrl: './confirmar-cuenta.component.html',
  styles: ``
})
export class ConfirmarCuentaComponent {
  cargando: boolean = false;
  errorMessage: string = '';
}
