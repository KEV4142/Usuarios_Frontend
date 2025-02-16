import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';


interface LoginResponse {
  token: string;
  email: string;
  nombreCompleto: string;
  username: string;
  tipo: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl+'account/login';
  private apiUrl1 = environment.apiUrl+'account/me';
  private apiRegistro = environment.apiUrl+'account/agregar';

  private Tipo : string | undefined;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, {
      Email: email,
      Password: password
    })
    .pipe(
      tap(res=>{
        this.saveToken(res.token);
        this.setAdmin(res.tipo);
      })
    )
  }
  registro(nombre: string, email: string, password: string, userName: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiRegistro, {
      nombreCompleto: nombre,
      username: userName,
      email: email,
      password: password
    })
    .pipe(
      tap(res=>{
        this.saveToken(res.token);
        this.setAdmin(res.tipo);
      })
    )
  }
  recupera(email: string): Observable<any> {
    const url = `${environment.apiUrl}account/restablecer`;
    return this.http.post(url, { email });
  }
  
  reinicio(userId: string, token: string, password: string): Observable<any> {
    const url = `${environment.apiUrl}account/restablecerpassword?id=${encodeURIComponent(userId)}&token=${encodeURIComponent(token)}`;
    return this.http.put(url, { password });
  }
  
  confirmEmail(userId: string, token: string): Observable<any> {
    const url = `${environment.apiUrl}account/confirmemail?userId=${encodeURIComponent(userId)}&token=${encodeURIComponent(token)}`;
    return this.http.get(url);
  }
  
  getUserDetails(): Observable<LoginResponse> {
    const token = this.getToken();
    if (!token) {
      throw new Error('Sin Autorizacion!!');
    }
    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<LoginResponse>(this.apiUrl1, { headers })
    .pipe(
      tap(res=>this.setAdmin(res.tipo))
    )
  }

  setAdmin(admin:string): void{
    this.Tipo=admin;
  }

  saveToken(token: string): void {
    sessionStorage.setItem('authToken', token);
  }
  getToken(): string | null {
    return sessionStorage.getItem('authToken');
  }
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
  isAdministrador(): boolean{
    return this.Tipo === 'Administrador';
  }
  isOperador(): boolean{
    return this.Tipo === 'Operador';
  }
  logout(): void {
    // sessionStorage.removeItem('authToken');
    sessionStorage.clear();
  }
  
}
