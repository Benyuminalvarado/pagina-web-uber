import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  private activeTripSubject = new BehaviorSubject<any>(null);
  private tripHistorySubject = new BehaviorSubject<any[]>([]);

  activeTrip$ = this.activeTripSubject.asObservable();
  tripHistory$ = this.tripHistorySubject.asObservable();

  setActiveTrip(trip: any): void {
    this.activeTripSubject.next(trip);
    localStorage.setItem('activeTrip', JSON.stringify(trip));
  }

  addToTripHistory(trip: any): void {
    const history = this.getTripHistory();
    history.push(trip);
    this.tripHistorySubject.next(history);
    localStorage.setItem('tripHistory', JSON.stringify(history));
  }

  getActiveTrip(): any {
    return JSON.parse(localStorage.getItem('activeTrip') || 'null');
  }

  getTripHistory(): any[] {
    return JSON.parse(localStorage.getItem('tripHistory') || '[]');
  }
}
