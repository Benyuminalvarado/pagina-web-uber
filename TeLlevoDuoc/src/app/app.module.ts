import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { SuccessModalComponent } from './success-modal/success-modal.component';
import { RateDriverModalComponent } from './rate-driver-modal/rate-driver-modal.component';

@NgModule({
  declarations: [AppComponent,
    NavbarComponent
    ,ConfirmationModalComponent
    ,SuccessModalComponent
    ,RateDriverModalComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
