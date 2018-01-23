import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeAccionesUsuarioComponent } from './mensaje-acciones-usuario.component';

describe('MensajeAccionesUsuarioComponent', () => {
  let component: MensajeAccionesUsuarioComponent;
  let fixture: ComponentFixture<MensajeAccionesUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MensajeAccionesUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MensajeAccionesUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
