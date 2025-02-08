import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-registro',
  imports: [CommonModule,ReactiveFormsModule,MatProgressSpinnerModule,RouterLink],
  templateUrl: './registro.component.html',
  styles: ``,
})
export class RegistroComponent {
  cargando: boolean = false;
  registroForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
      this.registroForm = this.fb.group({
        nombre: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        repetirPassword: ['', Validators.required]
      });
    }

    get nombre() {
      return this.registroForm.get('nombre');
    }

    get email() {
      return this.registroForm.get('email');
    }
  
    get password() {
      return this.registroForm.get('password');
    }
    
    get repetirPassword() {
      return this.registroForm.get('repetirPassword');
    }

    onSubmit(): void {
      if (this.registroForm.valid) {
        this.cargando = true;
        const { nombre,email, password } = this.registroForm.value;
        this.authService.registro(nombre,email, password).subscribe({
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
