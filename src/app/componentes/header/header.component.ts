import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [CommonModule,MatButtonModule, MatMenuModule, MatToolbarModule,MatIconModule],
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent {
  userType: string | undefined;
  isSmallScreen: boolean = false;

  constructor(private authService: AuthService,private router: Router) {this.checkScreenSize();}
  @HostListener('window:resize', [])
  onResize(): void {
    this.checkScreenSize();
  }
  private checkScreenSize(): void {
    this.isSmallScreen = window.innerWidth < 1024;
  }
  
  isAdmin(): boolean {
    return this.userType === "Administrador";
  }

  optTablero():void{
    this.router.navigate(['/dashboard'])
  }

  salir(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
