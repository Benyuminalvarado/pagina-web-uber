import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-rate-driver-modal',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Valorar al Conductor</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismiss()">Cerrar</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <p>Por favor, califica la experiencia de tu viaje:</p>
      <div class="stars">
        <ion-icon
          *ngFor="let star of stars; let i = index"
          [name]="i < rating ? 'star' : 'star-outline'"
          (click)="setRating(i + 1)"
        ></ion-icon>
      </div>
      <ion-button expand="block" color="primary" (click)="submitRating()">
        Enviar Calificación
      </ion-button>
    </ion-content>
  `,
  styles: [`
    .stars {
      display: flex;
      justify-content: center;
      font-size: 2rem;
      color: var(--ion-color-warning);
      margin: 20px 0;
    }
    ion-icon {
      cursor: pointer;
    }
  `],
})
export class RateDriverModalComponent {
  @Input() trip: any; // Recibe el viaje desde el componente padre
  rating: number = 0; // Calificación actual
  stars = [1, 2, 3, 4, 5]; // Representación de estrellas

  constructor(private modalController: ModalController) {}

  setRating(rating: number): void {
    this.rating = rating;
  }

  submitRating(): void {
    this.modalController.dismiss({ rating: this.rating }); // Devuelve la calificación
  }

  dismiss(): void {
    this.modalController.dismiss(); // Cierra el modal
  }
}
