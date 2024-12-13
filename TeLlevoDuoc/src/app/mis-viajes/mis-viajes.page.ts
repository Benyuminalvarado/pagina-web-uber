import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RateDriverModalComponent } from '../rate-driver-modal/rate-driver-modal.component';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-mis-viajes',
  templateUrl: './mis-viajes.page.html',
  styleUrls: ['./mis-viajes.page.scss'],
})
export class MisViajesPage implements OnInit {
  activeTrip: any = null; // Viaje actualmente activo
  tripHistory: any[] = []; // Historial de viajes realizados

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private modalController: ModalController
  ) { }

  ngOnInit(): void {
    this.loadTrips();
  }

  // Carga los viajes desde LocalStorage
  private loadTrips(): void {
    const savedActiveTrip = localStorage.getItem('activeTrip');
    this.activeTrip = savedActiveTrip ? JSON.parse(savedActiveTrip) : null;

    const savedTripHistory = localStorage.getItem('tripHistory');
    this.tripHistory = savedTripHistory ? JSON.parse(savedTripHistory) : [];

    this.changeDetectorRef.detectChanges();
  }

  // Mueve el viaje activo al historial y elimina el activo
  completeActiveTrip(): void {
    if (this.activeTrip) {
      // Mover el viaje activo al historial
      this.tripHistory.push(this.activeTrip);
      localStorage.setItem('tripHistory', JSON.stringify(this.tripHistory));

      // Eliminar el viaje activo
      this.activeTrip = null;
      localStorage.removeItem('activeTrip');

      // Notificar cambios
      const event = new Event('updateTrips');
      window.dispatchEvent(event);
    }
  }

  cancelActiveTrip(): void {
    if (this.activeTrip) {
      // Recuperar todos los viajes guardados
      const savedTrips = JSON.parse(localStorage.getItem('trips') || '[]');

      // Buscar el viaje activo en la lista y devolver el cupo
      const tripIndex = savedTrips.findIndex(
        (trip: any) =>
          trip.pickupLocation === this.activeTrip.pickupLocation &&
          trip.destination === this.activeTrip.destination
      );

      if (tripIndex !== -1) {
        savedTrips[tripIndex].capacity += 1; // Liberar un cupo
        localStorage.setItem('trips', JSON.stringify(savedTrips));
      }

      // Eliminar el viaje activo
      this.activeTrip = null;
      localStorage.removeItem('activeTrip');

      // Notificar cambios
      const event = new Event('updateTrips');
      window.dispatchEvent(event);
    }
  }


  deleteTripFromHistory(tripToDelete: any): void {
    // Filtrar el historial excluyendo el viaje seleccionado
    this.tripHistory = this.tripHistory.filter(
      (trip: any) =>
        !(trip.pickupLocation === tripToDelete.pickupLocation &&
          trip.destination === tripToDelete.destination &&
          trip.departureDateTime === tripToDelete.departureDateTime)
    );

    // Guardar el historial actualizado en localStorage
    localStorage.setItem('tripHistory', JSON.stringify(this.tripHistory));

    // Registrar el viaje como completado
    const tripHistory = JSON.parse(localStorage.getItem('tripHistory') || '[]');
    tripHistory.push(tripToDelete);
    localStorage.setItem('tripHistory', JSON.stringify(tripHistory));

    // Notificar cambios para actualizar el mapa
    const event = new Event('updateTrips');
    window.dispatchEvent(event);
  }





  // Enviar mensaje por WhatsApp
  sendWhatsApp(number: string): void {
    if (!number) {
      console.error('Número de WhatsApp no disponible.');
      return;
    }
    const url = `https://wa.me/${encodeURIComponent(number)}`;
    window.open(url, '_blank');
  }
}
