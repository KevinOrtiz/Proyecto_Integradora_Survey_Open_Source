import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarDiscusionesEncuestaComponent } from './administrar-discusiones-encuesta.component';

describe('AdministrarDiscusionesEncuestaComponent', () => {
  let component: AdministrarDiscusionesEncuestaComponent;
  let fixture: ComponentFixture<AdministrarDiscusionesEncuestaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarDiscusionesEncuestaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarDiscusionesEncuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
