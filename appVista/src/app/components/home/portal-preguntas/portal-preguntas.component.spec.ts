import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalPreguntasComponent } from './portal-preguntas.component';

describe('PortalPreguntasComponent', () => {
  let component: PortalPreguntasComponent;
  let fixture: ComponentFixture<PortalPreguntasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalPreguntasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalPreguntasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
