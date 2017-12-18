import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackBarEliminarPreguntaComponent } from './snack-bar-eliminar-pregunta.component';

describe('SnackBarEliminarPreguntaComponent', () => {
  let component: SnackBarEliminarPreguntaComponent;
  let fixture: ComponentFixture<SnackBarEliminarPreguntaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackBarEliminarPreguntaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackBarEliminarPreguntaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
