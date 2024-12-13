import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  paletteToggle = false; // Estado del interruptor

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Detecta la configuración inicial del sistema para modo oscuro
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.initializeDarkPalette(prefersDark.matches);

    // Escucha los cambios del sistema
    prefersDark.addEventListener('change', (mediaQuery) => this.initializeDarkPalette(mediaQuery.matches));
  }

  // Inicializa el modo oscuro según la preferencia del sistema
  initializeDarkPalette(isDark: boolean) {
    this.paletteToggle = isDark;
    this.toggleDarkPalette(isDark);
  }

  // Cambia el modo oscuro basado en el interruptor
  toggleChange(event: any) {
    const isDarkMode = event.detail.checked;
    this.toggleDarkPalette(isDarkMode);
  }

  // Aplica o elimina la clase de modo oscuro
  toggleDarkPalette(shouldAdd: boolean) {
    document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
  }

  // Verifica si el usuario está logueado
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  // Obtiene el usuario logueado
  getLoggedInUser() {
    return this.authService.getLoggedInUser();
  }

  // Cierra la sesión del usuario
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
