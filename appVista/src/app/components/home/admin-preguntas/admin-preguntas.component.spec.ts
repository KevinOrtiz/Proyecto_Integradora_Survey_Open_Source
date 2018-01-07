import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPreguntasComponent } from './admin-preguntas.component';

describe('AdminPreguntasComponent', () => {
  let component: AdminPreguntasComponent;
  let fixture: ComponentFixture<AdminPreguntasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPreguntasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPreguntasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
