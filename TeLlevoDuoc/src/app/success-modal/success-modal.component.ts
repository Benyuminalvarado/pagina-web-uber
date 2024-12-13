import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.scss'],
})
export class SuccessModalComponent {
  constructor(private modalController: ModalController) {}

  dismiss(): void {
    this.modalController.dismiss(null, 'confirm');
  }
}
