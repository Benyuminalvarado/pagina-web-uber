import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  token: string = '';
  email: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Leer el token desde la URL
    this.route.params.subscribe((params) => {
      if (params['token']) {
        this.token = params['token'];
        try {
          this.email = atob(this.token); // Decodifica el email desde el token
        } catch (error) {
          this.errorMessage = 'Token inválido o expirado.';
        }
      }
    });
  }

  changePassword() {
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      this.successMessage = '';
      return;
    }

    // Aquí puedes guardar la nueva contraseña en el almacenamiento local o manejar la lógica deseada
    console.log(`Email: ${this.email}, Nueva contraseña: ${this.newPassword}`);
    this.successMessage = 'Contraseña cambiada con éxito.';
    this.errorMessage = '';
    setTimeout(() => {
      this.router.navigate(['/login']); // Redirige al login después de un cambio exitoso
    }, 2000);
  }
}
