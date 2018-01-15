import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionMensajesComponent } from './notificacion-mensajes.component';

describe('NotificacionMensajesComponent', () => {
  let component: NotificacionMensajesComponent;
  let fixture: ComponentFixture<NotificacionMensajesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificacionMensajesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificacionMensajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
