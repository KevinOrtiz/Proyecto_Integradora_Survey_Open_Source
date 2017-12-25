import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSubComentariosComponent } from './lista-sub-comentarios.component';

describe('ListaSubComentariosComponent', () => {
  let component: ListaSubComentariosComponent;
  let fixture: ComponentFixture<ListaSubComentariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaSubComentariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaSubComentariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
