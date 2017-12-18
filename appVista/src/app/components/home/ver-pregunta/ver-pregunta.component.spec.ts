import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPreguntaComponent } from './ver-pregunta.component';

describe('VerPreguntaComponent', () => {
  let component: VerPreguntaComponent;
  let fixture: ComponentFixture<VerPreguntaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerPreguntaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerPreguntaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
