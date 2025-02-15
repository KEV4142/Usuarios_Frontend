import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder,FormGroup,ReactiveFormsModule,Validators} from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-olvide-password',
  imports: [CommonModule,ReactiveFormsModule,MatProgressSpinnerModule,RouterLink],
  templateUrl: './olvide-password.component.html',
  styles: ``,
})
export class OlvidePasswordComponent {
  cargando: boolean = false;
  recuperarForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  constructor(private fb: FormBuilder,private authService: AuthService,private router: Router) {
    this.recuperarForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get email() {
    return this.recuperarForm.get('email');
  }

  onSubmit(): void {
    if (this.recuperarForm.valid) {
      this.cargando = true;
      const { email } = this.recuperarForm.value;

      this.authService.recupera(email).subscribe({
        next: () => {
          this.cargando = false;
          this.successMessage = 'Listo. Si el correo es válido, recibirás un email con instrucciones.';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        },
        error: (err) => {
          this.cargando = false;
          this.errorMessage = err.error?.error || 'Ocurrió un error inesperado. Intente nuevamente.';
          setTimeout(() => {
            this.errorMessage = '';
          }, 5000);
        }
      });
    }
  }
}
