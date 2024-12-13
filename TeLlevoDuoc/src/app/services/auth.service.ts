import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private users: { displayName?: string; email: string; password: string }[] = [];
  private loggedInUser: { displayName?: string; email: string } | null = null; // Usuario autenticado

  constructor() {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      this.users = JSON.parse(savedUsers);
    }

    // Restaurar la sesión si el usuario estaba logueado
    const savedLoggedInUser = localStorage.getItem('loggedInUser');
    if (savedLoggedInUser) {
      this.loggedInUser = JSON.parse(savedLoggedInUser);
    }
  }

  async register(displayName: string, email: string, password: string): Promise<boolean> {
    const normalizedEmail = email.trim().toLowerCase();
    const userExists = this.users.some((user) => user.email === normalizedEmail);

    if (userExists) {
      return false; // El usuario ya existe
    }

    this.users.push({ displayName, email: normalizedEmail, password: password.trim() });
    localStorage.setItem('users', JSON.stringify(this.users));
    return true;
  }

  async login(email: string, password: string): Promise<boolean> {
    console.log('Iniciando login...');

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();

    const user = this.users.find((user) => {
      const userEmailNormalized = user.email.trim().toLowerCase();
      const userPasswordNormalized = user.password.trim();

      console.log('Comparando con usuario:', user);

      return (
        userEmailNormalized === normalizedEmail &&
        userPasswordNormalized === normalizedPassword
      );
    });

    if (user) {
      this.loggedInUser = { displayName: user.displayName, email: user.email };
      localStorage.setItem('loggedInUser', JSON.stringify(this.loggedInUser)); // Guardar usuario logueado
    }

    console.log('Usuario encontrado:', user);
    return !!user;
  }

  getLoggedInUser(): { displayName?: string; email: string } | null {
    return this.loggedInUser;
  }

  logout(): void {
    this.loggedInUser = null;
    localStorage.removeItem('loggedInUser'); // Limpiar sesión
  }

  isLoggedIn(): boolean {
    return this.loggedInUser !== null;
  }
}
