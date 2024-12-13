import { Component } from '@angular/core';
import emailjs from 'emailjs-com';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.page.html',
  styleUrls: ['./recover-password.page.scss'],
})
export class RecoverPasswordPage {
  email: string = '';
  successMessage: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;
  lastSentEmail: number = 0; // Timestamp del último correo enviado

  sendRecoveryEmail() {
    // Validar que el correo esté ingresado
    if (!this.email) {
      this.errorMessage = 'Por favor, ingresa tu correo electrónico.';
      this.successMessage = '';
      return;
    }

    // Validar el formato del correo
    if (!this.validateEmail(this.email)) {
      this.errorMessage = 'El correo ingresado no tiene un formato válido.';
      this.successMessage = '';
      return;
    }

    // Validar si el correo existe en localStorage
    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = savedUsers.some((user: any) => user.email === this.email);

    if (!userExists) {
      this.errorMessage = 'El correo ingresado no está registrado.';
      this.successMessage = '';
      return;
    }

    // Evitar múltiples envíos en corto tiempo
    const now = Date.now();
    if (now - this.lastSentEmail < 60000) { // 60 segundos de intervalo
      this.errorMessage = 'Por favor, espera antes de solicitar otro correo de recuperación.';
      this.successMessage = '';
      return;
    }

    this.isLoading = true;

    // Generar un token para el enlace de recuperación
    const token = btoa(this.email);

    // Crear los parámetros para el correo
    const templateParams = {
      email: this.email,
      reset_link: `${window.location.origin}/change-password/${token}`, // Enlace dinámico
    };

    // Enviar el correo usando EmailJS
    emailjs
    .send('service_x2riavw', 'template_mrhvc2q', templateParams, 'Za7tdIsbEevgr-68n')
      .then(
        () => {
          this.successMessage = 'Correo de recuperación enviado con éxito. Por favor, revisa tu correo.';
          this.errorMessage = '';
          this.lastSentEmail = now; // Actualizar el tiempo del último envío
        },
        (error) => {
          console.error('Error enviando el correo:', error);
          this.errorMessage = 'No se pudo enviar el correo. Inténtalo nuevamente.';
          this.successMessage = '';
        }
      )
      .finally(() => {
        this.isLoading = false;
      });
  }

  /**
   * Valida el formato del correo electrónico
   * @param email Correo electrónico a validar
   * @returns true si el formato es válido, false en caso contrario
   */
  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
