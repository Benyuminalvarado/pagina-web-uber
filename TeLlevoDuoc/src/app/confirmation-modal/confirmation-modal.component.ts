import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-confirmation-modal',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Confirmar Viaje</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismiss('cancel')">Cerrar</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <p>¿Quieres confirmar el viaje a <b>{{ trip.destination }}</b>?</p>
      <ion-footer>
        <ion-button expand="block" color="danger" (click)="dismiss('cancel')">Cancelar</ion-button>
        <ion-button expand="block" color="primary" (click)="dismiss('confirm')">Confirmar</ion-button>
      </ion-footer>
    </ion-content>
  `,
  styles: [``],
})
export class ConfirmationModalComponent {
  @Input() trip: any; // Recibe el viaje desde el modalController

  constructor(private modalController: ModalController) {}

  dismiss(role: string): void {
    this.modalController.dismiss(null, role);
  }
}
