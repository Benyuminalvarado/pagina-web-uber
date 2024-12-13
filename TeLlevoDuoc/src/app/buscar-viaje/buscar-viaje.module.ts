import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; // Importa CUSTOM_ELEMENTS_SCHEMA
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuscarViajePageRoutingModule } from './buscar-viaje-routing.module';
import { BuscarViajePage } from './buscar-viaje.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuscarViajePageRoutingModule,
  ],
  declarations: [BuscarViajePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Agrega el esquema aquí
})
export class BuscarViajePageModule {}
