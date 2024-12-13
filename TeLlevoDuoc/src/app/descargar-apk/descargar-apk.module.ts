import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DescargarApkPageRoutingModule } from './descargar-apk-routing.module';

import { DescargarApkPage } from './descargar-apk.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DescargarApkPageRoutingModule
  ],
  declarations: [DescargarApkPage]
})
export class DescargarApkPageModule {}
