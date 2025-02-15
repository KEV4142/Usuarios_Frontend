import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reinicio-password',
  imports: [CommonModule,ReactiveFormsModule,MatProgressSpinnerModule],
  templateUrl: './reinicio-password.component.html',
  styles: ``
})
export class ReinicioPasswordComponent implements OnInit {
  cargando: boolean = false;
  reinicioForm: FormGroup;
  errorMessage: string = '';
  userId: string = '';
  token: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.reinicioForm = this.fb.group(
      {
        password: ['', [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/[A-Z]/),
          Validators.pattern(/[\W_]/),
          Validators.pattern(/\d/)
        ]],
        repetirPassword: ['', Validators.required]
      },
      { validators: this.passwordsCoinciden }
    );
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'];
      this.token = params['token'];
    });
  }

  get password(): AbstractControl {
    return this.reinicioForm.get('password') ?? { value: '', errors: null, touched: false } as AbstractControl;
  }
  
  get repetirPassword(): AbstractControl {
    return this.reinicioForm.get('repetirPassword') ?? { value: '', errors: null, touched: false } as AbstractControl;
  }
  

  passwordsCoinciden(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const repetirPassword = group.get('repetirPassword')?.value;
    return password === repetirPassword ? null : { notSame: true };
  }

  onSubmit(): void {
    if (this.reinicioForm.invalid) {
      this.errorMessage = "Las contraseñas no coinciden o no cumplen los requisitos.";
      return;
    }

    this.cargando = true;
    const { password } = this.reinicioForm.value;

    this.authService.reinicio(this.userId, this.token, password).subscribe({
      next: () => {
        this.cargando = false;
        this.snackBar.open('Contraseña Actualizada Exitosamente', 'Cerrar', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        setTimeout(() => this.router.navigate(['/login']), 2000);
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
