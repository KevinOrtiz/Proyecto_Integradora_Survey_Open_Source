import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionAccionesComponent } from './notificacion-acciones.component';

describe('NotificacionAccionesComponent', () => {
  let component: NotificacionAccionesComponent;
  let fixture: ComponentFixture<NotificacionAccionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificacionAccionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificacionAccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
