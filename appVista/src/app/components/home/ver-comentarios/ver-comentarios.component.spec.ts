import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerComentariosComponent } from './ver-comentarios.component';

describe('VerComentariosComponent', () => {
  let component: VerComentariosComponent;
  let fixture: ComponentFixture<VerComentariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerComentariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerComentariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
