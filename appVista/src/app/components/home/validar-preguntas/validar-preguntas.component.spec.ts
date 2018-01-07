import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarPreguntasComponent } from './validar-preguntas.component';

describe('ValidarPreguntasComponent', () => {
  let component: ValidarPreguntasComponent;
  let fixture: ComponentFixture<ValidarPreguntasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidarPreguntasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidarPreguntasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
