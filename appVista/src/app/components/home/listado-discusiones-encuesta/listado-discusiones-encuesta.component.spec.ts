import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoDiscusionesEncuestaComponent } from './listado-discusiones-encuesta.component';

describe('ListadoDiscusionesEncuestaComponent', () => {
  let component: ListadoDiscusionesEncuestaComponent;
  let fixture: ComponentFixture<ListadoDiscusionesEncuestaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoDiscusionesEncuestaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoDiscusionesEncuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
