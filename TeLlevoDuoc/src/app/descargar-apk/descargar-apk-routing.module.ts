import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DescargarApkPage } from './descargar-apk.page';

const routes: Routes = [
  {
    path: '',
    component: DescargarApkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DescargarApkPageRoutingModule {}
