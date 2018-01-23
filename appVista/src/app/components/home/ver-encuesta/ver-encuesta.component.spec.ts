import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerEncuestaComponent } from './ver-encuesta.component';

describe('VerEncuestaComponent', () => {
  let component: VerEncuestaComponent;
  let fixture: ComponentFixture<VerEncuestaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerEncuestaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerEncuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
