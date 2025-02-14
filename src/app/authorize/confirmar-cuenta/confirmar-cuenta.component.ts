import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-confirmar-cuenta',
  imports: [CommonModule,MatProgressSpinnerModule,RouterLink],
  templateUrl: './confirmar-cuenta.component.html',
  styles: ``
})
export class ConfirmarCuentaComponent implements OnInit {
  cargando: boolean = true;
  errorMessage: string = '';
  mensajeExito: string = '';
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    const userId = this.route.snapshot.queryParamMap.get('userId');
    const token = this.route.snapshot.queryParamMap.get('token');

    if (userId && token) {
      this.authService.confirmEmail(userId, token).subscribe({
        next: () => {
          this.mensajeExito = 'Correo confirmado exitosamente. Redirigiendo...';
          this.cargando = false;
          setTimeout(() => this.router.navigate(['/login']), 3000);
        },
        error: (error) => {
          this.errorMessage = 'Error al confirmar el correo. Intenta nuevamente.';
          console.error(error);
          this.cargando = false;
        }
      });
    } else {
      this.errorMessage = 'Token o ID de usuario no proporcionado.';
      this.cargando = false;
    }
  }

}
