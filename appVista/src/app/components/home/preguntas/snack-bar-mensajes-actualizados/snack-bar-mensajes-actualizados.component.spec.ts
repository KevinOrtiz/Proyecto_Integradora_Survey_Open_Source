import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackBarMensajesActualizadosComponent } from './snack-bar-mensajes-actualizados.component';

describe('SnackBarMensajesActualizadosComponent', () => {
  let component: SnackBarMensajesActualizadosComponent;
  let fixture: ComponentFixture<SnackBarMensajesActualizadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackBarMensajesActualizadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackBarMensajesActualizadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
