import { Component, AfterViewInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { BehaviorSubject } from 'rxjs';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import 'leaflet-routing-machine';

@Component({
  selector: 'app-buscar-viaje',
  templateUrl: './buscar-viaje.page.html',
  styleUrls: ['./buscar-viaje.page.scss'],
})
export class BuscarViajePage implements AfterViewInit {
  searchQuery: string = '';
  map!: L.Map;
  selectedTrip: any = null;
  userMarker!: L.Marker;
  tripMarkers: L.Marker[] = [];
  trips$ = new BehaviorSubject<any[]>([]); // Reactivo
  filteredTrips$ = new BehaviorSubject<any[]>([]); // Reactivo
  currentLocation: L.LatLngExpression = [-33.4489, -70.6693];

  constructor(private modalController: ModalController, private router: Router) { }

  ngAfterViewInit(): void {
    this.initMap();
    this.loadTrips();
    this.getCurrentLocation();
  }

  ionViewDidEnter(): void {
    setTimeout(() => {
      if (this.map) {
        this.map.invalidateSize();
      }
    }, 100);
  }

  ngOnInit(): void {
    // Escuchar evento global para actualizar viajes
    window.addEventListener('updateTrips', () => {
      this.loadTrips(); // Recargar los viajes activos
    });
  }
  


  initMap(): void {
    if (this.map) {
      return;
    }

    this.map = L.map('map', {
      center: this.currentLocation,
      zoom: 12,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    this.addUserMarker();

    setTimeout(() => {
      this.map.invalidateSize();
    }, 100);
  }


  loadTrips(): void {
    const savedTrips = JSON.parse(localStorage.getItem('trips') || '[]');
    const tripHistory = JSON.parse(localStorage.getItem('tripHistory') || '[]');
  
    // Filtrar viajes que no estén en el historial
    const activeTrips = savedTrips.filter(
      (trip: any) =>
        !tripHistory.some(
          (completedTrip: any) =>
            completedTrip.pickupLocation === trip.pickupLocation &&
            completedTrip.destination === trip.destination &&
            completedTrip.departureDateTime === trip.departureDateTime
        )
    );
  
    this.trips$.next(activeTrips);
    this.filteredTrips$.next([...activeTrips]);
    this.showTripsOnMap();
  }
  
  
  

  addUserMarker(): void {
    const userIcon = this.createIonicIcon('location-outline', 'white', 'blue');
    this.userMarker = L.marker(this.currentLocation, { icon: userIcon, draggable: true }).addTo(this.map);

    // Usar función flecha para garantizar el contexto
    this.userMarker.on('dragend', () => {
      this.getCurrentLocation();
    });
  }

  getCurrentLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords: L.LatLngExpression = [position.coords.latitude, position.coords.longitude];
          this.map.setView(coords, 15);
          this.userMarker.setLatLng(coords);
          this.currentLocation = coords;
        },
        (error) => console.error('Error obteniendo la ubicación actual:', error)
      );
    } else {
      console.error('Geolocalización no soportada por el navegador.');
    }
  }


  resetInput(): void {
    this.searchQuery = '';
    this.filteredTrips$.next(this.trips$.value);
    this.map.setView(this.currentLocation, 12);
    this.showTripsOnMap();
  }

  searchLocation(): void {
    if (!this.searchQuery.trim()) {
      return;
    }

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(this.searchQuery)}&countrycodes=cl`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          const { lat, lon } = data[0];
          this.map.setView([+lat, +lon], 15);

          const filtered = this.trips$.value.filter((trip) =>
            trip.destination.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
          this.filteredTrips$.next(filtered);
          this.showTripsOnMap();
        }
      });
  }

  async openConfirmationModal(trip: any): Promise<void> {
    const modal = await this.modalController.create({
      component: ConfirmationModalComponent,
      componentProps: { trip },
    });
    await modal.present();
    const { role } = await modal.onDidDismiss();
    if (role === 'confirm') {
      this.confirmTrip(trip);
    }
  }

  confirmTrip(trip: any): void {
    localStorage.setItem('activeTrip', JSON.stringify(trip));
    this.router.navigate(['/mis-viajes']);
  }

  createIonicIcon(iconName: string, color: string, backgroundColor: string): L.DivIcon {
    const iconHtml = `
      <div style="
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: ${backgroundColor};
        border-radius: 50%;
        width: 30px;
        height: 30px;">
        <ion-icon name="${iconName}" style="color: ${color}; font-size: 18px;"></ion-icon>
      </div>
    `;
    return L.divIcon({
      className: '',
      html: iconHtml,
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    });
  }

  showTripsOnMap(): void {
    // Eliminar marcadores existentes
    this.tripMarkers.forEach((marker) => this.map.removeLayer(marker));
    this.tripMarkers = [];
  
    // Mostrar solo los viajes activos
    this.filteredTrips$.value.forEach((trip, index) => {
      if (trip.capacity > 0) {
        // Lugar de encuentro
        if (trip.pickupLatLng?.lat && trip.pickupLatLng?.lon) {
          const pickupIcon = this.createIonicIcon('location-outline', 'white', 'blue');
          const pickupMarker = L.marker([trip.pickupLatLng.lat, trip.pickupLatLng.lon], { icon: pickupIcon }).addTo(this.map);
          
          // Escuchar clic en el marcador
          pickupMarker.on('click', () => this.scrollToCard(index));
  
          pickupMarker.bindPopup(`
            <b>Lugar de Encuentro:</b> ${trip.pickupLocation}<br>
            <b>Destino:</b> ${trip.destination}<br>
            <b>Chofer:</b> ${trip.driverName}<br>
            <b>WhatsApp:</b> ${trip.whatsappNumber}<br>
            <b>Capacidad Disponible:</b> ${trip.capacity}<br>
            <b>Ranking:</b> ★★★★★ (4.5)<br>
            <b>Fecha:</b> ${new Date(trip.departureDateTime).toLocaleString()}<br>
            <b>Costo:</b> ${trip.costPerPassenger.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}`);
          this.tripMarkers.push(pickupMarker);
        }
  
        // Destino final
        if (trip.destinationLatLng?.lat && trip.destinationLatLng?.lon) {
          const destinationIcon = this.createIonicIcon('navigate', 'white', 'red');
          const destinationMarker = L.marker([trip.destinationLatLng.lat, trip.destinationLatLng.lon], { icon: destinationIcon }).addTo(this.map);
  
          // Escuchar clic en el marcador
          destinationMarker.on('click', () => this.scrollToCard(index));
  
          destinationMarker.bindPopup(`
            <b>Lugar de Encuentro:</b> ${trip.pickupLocation}<br>
            <b>Destino:</b> ${trip.destination}<br>
            <b>Chofer:</b> ${trip.driverName}<br>
            <b>WhatsApp:</b> ${trip.whatsappNumber}<br>
            <b>Capacidad Disponible:</b> ${trip.capacity}<br>
            <b>Ranking:</b> ★★★★★ (4.5)<br>
            <b>Fecha:</b> ${new Date(trip.departureDateTime).toLocaleString()}<br>
            <b>Costo:</b> ${trip.costPerPassenger.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}`);
          this.tripMarkers.push(destinationMarker);
        }
      }
    });
  
    // Marcador de la ubicación del usuario
    const userIcon = this.createIonicIcon('person', 'white', 'green');
    if (this.userMarker) {
      this.map.removeLayer(this.userMarker); // Eliminar marcador anterior
    }
    this.userMarker = L.marker(this.currentLocation, { icon: userIcon }).addTo(this.map);
  }
  


  // Método para hacer scroll al card seleccionado
  scrollToCard(index: number): void {
    const card = document.getElementById(`trip-${index}`);
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'center' }); // Scroll al card
      this.selectedTrip = this.filteredTrips$.value[index]; // Actualizar el viaje seleccionado
    }
  }
  

  



}
