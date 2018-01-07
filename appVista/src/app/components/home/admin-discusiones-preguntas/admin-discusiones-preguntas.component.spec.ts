import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDiscusionesPreguntasComponent } from './admin-discusiones-preguntas.component';

describe('AdminDiscusionesPreguntasComponent', () => {
  let component: AdminDiscusionesPreguntasComponent;
  let fixture: ComponentFixture<AdminDiscusionesPreguntasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDiscusionesPreguntasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDiscusionesPreguntasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
