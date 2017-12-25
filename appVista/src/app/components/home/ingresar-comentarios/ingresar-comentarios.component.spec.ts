import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarComentariosComponent } from './ingresar-comentarios.component';

describe('IngresarComentariosComponent', () => {
  let component: IngresarComentariosComponent;
  let fixture: ComponentFixture<IngresarComentariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresarComentariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresarComentariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
