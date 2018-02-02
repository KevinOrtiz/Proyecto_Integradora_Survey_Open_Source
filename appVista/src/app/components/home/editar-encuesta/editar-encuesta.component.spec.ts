import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEncuestaComponent } from './editar-encuesta.component';

describe('EditarEncuestaComponent', () => {
  let component: EditarEncuestaComponent;
  let fixture: ComponentFixture<EditarEncuestaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarEncuestaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarEncuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
