import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompartirEncuestaComponent } from './compartir-encuesta.component';

describe('CompartirEncuestaComponent', () => {
  let component: CompartirEncuestaComponent;
  let fixture: ComponentFixture<CompartirEncuestaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompartirEncuestaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompartirEncuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
