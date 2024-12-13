import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DescargarApkPage } from './descargar-apk.page';

describe('DescargarApkPage', () => {
  let component: DescargarApkPage;
  let fixture: ComponentFixture<DescargarApkPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DescargarApkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
