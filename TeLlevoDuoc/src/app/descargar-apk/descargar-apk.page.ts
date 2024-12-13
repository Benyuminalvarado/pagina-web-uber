import { Component, AfterViewInit } from '@angular/core';

declare var QRCode: any; // Para usar la librería QRCode.js

@Component({
  selector: 'app-descargar-apk',
  templateUrl: './descargar-apk.page.html',
  styleUrls: ['./descargar-apk.page.scss'],
})
export class DescargarApkPage implements AfterViewInit {

  constructor() {}

  ngAfterViewInit(): void {
    this.detectDeviceAndShowOption();
  }

  // Detectar dispositivo y mostrar botón o código QR
  detectDeviceAndShowOption(): void {
    const userAgent = navigator.userAgent.toLowerCase();
  
    const container = document.getElementById('download-container') as HTMLElement;
  
    if (/android|iphone|ipad|ipod/i.test(userAgent)) {
      // Mostrar botón para dispositivos móviles
      container.innerHTML = `
        <ion-button expand="block" id="download-btn" style="margin-top: 20px;">
          Descargar APK
        </ion-button>
      `;
      document.getElementById('download-btn')?.addEventListener('click', () => {
        window.location.href = 'ruta_del_apk.apk'; // Cambia por la URL de tu APK
      });
    } else {
      // Mostrar código QR para escritorio
      container.innerHTML = `
        <div id="qrcode" style="margin: 20px auto;"></div>
        <p>Escanea este código QR con tu móvil para descargar el APK</p>
      `;
      this.generateQRCode('ruta_del_apk.apk'); // Cambia por la URL de tu APK
    }
  }
  
  

  // Generar el código QR
  generateQRCode(apkUrl: string): void {
    const qrcode = new QRCode(document.getElementById('qrcode'), {
      text: apkUrl,
      width: 150,
      height: 150,
      colorDark: '#000000',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H,
    });
  }
}
