import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-reinicio-password',
  imports: [CommonModule,ReactiveFormsModule,MatProgressSpinnerModule],
  templateUrl: './reinicio-password.component.html',
  styles: ``
})
export class ReinicioPasswordComponent {
  cargando: boolean = false;
  reinicioForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder,private authService: AuthService,private router: Router) {
      this.reinicioForm = this.fb.group({
        password: ['', Validators.required],
        repetirPassword: ['', Validators.required]
      });
    }

    get password() {
      return this.reinicioForm.get('password');
    }
    
    get repetirPassword() {
      return this.reinicioForm.get('repetirPassword');
    }

    onSubmit(): void {
      if (this.reinicioForm.valid) {
        this.cargando = true;
        const { password } = this.reinicioForm.value;
        this.authService.reinicio(password).subscribe({
          next: (response) => {
            this.cargando = false;
            this.router.navigate(['/dashboard']);
          },
          error: (err) => {
            this.cargando = false;
            if (err.status === 500) {
              this.errorMessage = 'Error interno del servidor. Intente nuevamente más tarde.';
            } else if (err.status === 401) {
              this.errorMessage = 'Correo electrónico o contraseña incorrectos.';
            } else {
              this.errorMessage = 'Ocurrió un error inesperado. Intente nuevamente.';
            }
            setTimeout(() => {
              this.errorMessage = '';
            }, 5000);
          }
        });
      }
    }
}
