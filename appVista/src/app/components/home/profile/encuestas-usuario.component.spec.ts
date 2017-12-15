import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestasUsuarioComponent } from './encuestas-usuario.component';

describe('EncuestasUsuarioComponent', () => {
  let component: EncuestasUsuarioComponent;
  let fixture: ComponentFixture<EncuestasUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncuestasUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncuestasUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
