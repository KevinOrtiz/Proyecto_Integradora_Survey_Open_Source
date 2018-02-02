import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarEncuestaComponent } from './administrar-encuesta.component';

describe('AdministrarEncuestaComponent', () => {
  let component: AdministrarEncuestaComponent;
  let fixture: ComponentFixture<AdministrarEncuestaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarEncuestaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarEncuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
