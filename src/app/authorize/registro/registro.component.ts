import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
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
  emailEnviado: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {
      this.registroForm = this.fb.group({
        nombre: ['', [Validators.required]],
        userName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        repetirPassword: ['', Validators.required]
      },
      { validators: this.passwordsIgualesValidator}
    );
    }

    get nombre() {
      return this.registroForm.get('nombre');
    }
    get userName() {
      return this.registroForm.get('userName');
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

    get passwordsNoCoinciden(): boolean {
      return this.registroForm.hasError('passwordsNoCoinciden') ? true : false;
    }
  
    passwordsIgualesValidator(control: AbstractControl): ValidationErrors | null {
      const password = control.get('password')?.value;
      const repetirPassword = control.get('repetirPassword')?.value;
      return password === repetirPassword ? null : { passwordsNoCoinciden: true };
    }

    onSubmit(): void {
      if (this.registroForm.valid) {
        this.cargando = true;
        const { nombre,email, password, userName } = this.registroForm.value;
        this.authService.registro(nombre,email, password, userName).subscribe({
          next: (response) => {
            this.cargando = false;
            this.emailEnviado = true;
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
