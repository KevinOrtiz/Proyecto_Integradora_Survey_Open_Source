import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntajeComponent } from './puntaje.component';

describe('PuntajeComponent', () => {
  let component: PuntajeComponent;
  let fixture: ComponentFixture<PuntajeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuntajeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuntajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
