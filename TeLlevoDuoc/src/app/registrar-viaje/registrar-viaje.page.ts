import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SuccessModalComponent } from '../success-modal/success-modal.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-registrar-viaje',
  templateUrl: './registrar-viaje.page.html',
  styleUrls: ['./registrar-viaje.page.scss'],
})
export class RegistrarViajePage {
  newTrip: any = {
    driverName: '',
    whatsappNumber: '',
    pickupLocation: '',
    pickupLatLng: { lat: '', lon: '' },
    destination: '',
    destinationLatLng: { lat: '', lon: '' },
    departureDateTime: '',
    capacity: null,
    costPerPassenger: null,
  };

  pickupSuggestions: any[] = [];
  destinationSuggestions: any[] = [];
  isLoadingPickup = false;

  constructor(private router: Router, private modalController: ModalController) {}

  async showSuccessModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: SuccessModalComponent,
    });

    await modal.present();

    const { role } = await modal.onDidDismiss();
    if (role === 'confirm') {
      this.router.navigate(['/home']);
    }
  }

  fetchPickupSuggestions(event: Event): void {
    const input = event.target as HTMLInputElement;
    const query = input.value;
  
    if (!query.trim()) {
      this.pickupSuggestions = [];
      return;
    }

    this.isLoadingPickup = true;
  
    const viewbox = '-75.0,-56.0,-66.0,-17.5'; // Límites de Chile
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=CL&bounded=1&viewbox=${viewbox}`;
  
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.pickupSuggestions = data || [];
      })
      .catch((error) => {
        console.error('Error fetching pickup suggestions:', error);
        this.pickupSuggestions = [];
      })
      .finally(() => {
        this.isLoadingPickup = false;
      });
  }
  

  selectPickupSuggestion(suggestion: any): void {
    this.newTrip.pickupLocation = suggestion.display_name;
    this.newTrip.pickupLatLng = { lat: suggestion.lat, lon: suggestion.lon };
    this.pickupSuggestions = [];
  }

  fetchDestinationSuggestions(event: Event): void {
    const input = event.target as HTMLInputElement;
    const query = input.value;

    if (!query.trim()) {
      this.destinationSuggestions = [];
      return;
    }

    const viewbox = '-75.0,-56.0,-66.0,-17.5';
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      query
    )}&viewbox=${viewbox}&bounded=1`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.destinationSuggestions = data || [];
      })
      .catch((error) => {
        console.error('Error fetching destination suggestions:', error);
        this.destinationSuggestions = [];
      });
  }

  selectDestinationSuggestion(suggestion: any): void {
    this.newTrip.destination = suggestion.display_name;
    this.newTrip.destinationLatLng = { lat: suggestion.lat, lon: suggestion.lon };
    this.destinationSuggestions = [];
  }

  submitForm(): void {
    const { driverName, whatsappNumber, pickupLocation, destination, departureDateTime, capacity, costPerPassenger } =
      this.newTrip;
  
    if (!driverName || !whatsappNumber || !pickupLocation || !destination || !departureDateTime || !capacity || !costPerPassenger) {
      console.error('Por favor, completa todos los campos obligatorios.');
      return;
    }
  
    console.log('Formulario enviado:', this.newTrip);
  
    // Guardar el nuevo viaje en localStorage
    const trips = JSON.parse(localStorage.getItem('trips') || '[]');
    trips.push(this.newTrip);
    localStorage.setItem('trips', JSON.stringify(trips));
  
    // Notificar cambios a través de un evento global
    const event = new Event('updateTrips');
    window.dispatchEvent(event);
  
    // Mostrar el modal de éxito
    this.showSuccessModal();
  }
  
  

  isFormValid(): boolean {
    const { driverName, whatsappNumber, pickupLocation, destination, departureDateTime, capacity, costPerPassenger } =
      this.newTrip;

    return !!(driverName && whatsappNumber && pickupLocation && destination && departureDateTime && capacity && costPerPassenger);
  }

  isWhatsAppNumberValid(): boolean {
    const whatsappRegex = /^\+?\d{10,15}$/; // Número de WhatsApp internacional válido
    return whatsappRegex.test(this.newTrip.whatsappNumber);
  }

  cancel(): void {
    this.newTrip = {
      driverName: '',
      whatsappNumber: '',
      pickupLocation: '',
      pickupLatLng: { lat: '', lon: '' },
      destination: '',
      destinationLatLng: { lat: '', lon: '' },
      departureDateTime: '',
      capacity: null,
      costPerPassenger: null,
    };
    this.router.navigate(['/home']);
  }
}
