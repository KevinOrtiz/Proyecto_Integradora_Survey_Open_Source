import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoDiscusionesPreguntaComponent } from './listado-discusiones-pregunta.component';

describe('ListadoDiscusionesPreguntaComponent', () => {
  let component: ListadoDiscusionesPreguntaComponent;
  let fixture: ComponentFixture<ListadoDiscusionesPreguntaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoDiscusionesPreguntaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoDiscusionesPreguntaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
