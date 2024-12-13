import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  displayName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) { }

  async register() {
    if (!this.displayName || !this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Por favor, completa todos los campos.';
      return;
    }

    if (!this.validateEmail(this.email)) {
      this.errorMessage = 'Por favor, ingresa un correo electrónico válido.';
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }

    this.isLoading = true;

    try {
      const isRegistered = await this.authService.register(this.displayName, this.email, this.password);

      if (isRegistered) {
        await this.showRegistrationAlert(); // Mostrar alerta
        this.clearInputs(); // Limpiar los campos
        this.router.navigate(['/login']); // Redirigir al login
      } else {
        this.errorMessage = 'El correo electrónico ya está registrado.';
      }
    } catch (error) {
      this.errorMessage = 'Hubo un error al intentar registrarte. Inténtalo nuevamente.';
    } finally {
      this.isLoading = false;
    }
  }

  // Método para limpiar los campos de entrada
  private clearInputs(): void {
    this.displayName = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
  }


  // Método para mostrar la alerta
  async showRegistrationAlert() {
    const alert = await this.alertController.create({
      header: '¡Registro Exitoso!',
      message: `Bienvenido/a, ${this.displayName}! Tu cuenta ha sido creada exitosamente.`,
      buttons: ['Aceptar'],
    });

    await alert.present();
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
