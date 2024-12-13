  import { Component } from '@angular/core';
  import { Router } from '@angular/router';
  import { AuthService } from '../services/auth.service';
  
  @Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
  })
  export class LoginPage {
    email: string = '';
    password: string = '';
    errorMessage: string = '';
  
    constructor(private authService: AuthService, private router: Router) {}
  
    async login() {
      if (!this.email || !this.password) {
        this.errorMessage = 'Por favor, completa todos los campos.';
        return;
      }
    
      try {
        const isLoggedIn = await this.authService.login(this.email, this.password);
        if (isLoggedIn) {
          this.clearInputs();
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = 'Credenciales incorrectas.';
        }
      } catch (error) {
        this.errorMessage = 'Hubo un error al intentar iniciar sesión.';
        console.error('Error en el login:', error);
      }
    }
    
    
    // Método para limpiar los campos de entrada
    private clearInputs(): void {
      this.email = '';
      this.password = '';
    }
    
  
    navigateToRegister() {
      this.router.navigate(['/register']);
    }
  
    navigateToRecoverPassword() {
      this.router.navigate(['/recover-password']);
    }
  
    onFocus(event: FocusEvent): void {
      const target = event.target as HTMLElement;
      const parent = target.closest('ion-item');
      parent?.classList.add('focused');
    }
    
    onBlur(event: FocusEvent): void {
      const target = event.target as HTMLElement;
      const parent = target.closest('ion-item');
      parent?.classList.remove('focused');
    }
    
  }
  