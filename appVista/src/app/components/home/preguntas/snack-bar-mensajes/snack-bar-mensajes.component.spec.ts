import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackBarMensajesComponent } from './snack-bar-mensajes.component';

describe('SnackBarMensajesComponent', () => {
  let component: SnackBarMensajesComponent;
  let fixture: ComponentFixture<SnackBarMensajesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackBarMensajesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackBarMensajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
