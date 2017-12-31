import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoDiscusionesComponent } from './listado-discusiones.component';

describe('ListadoDiscusionesComponent', () => {
  let component: ListadoDiscusionesComponent;
  let fixture: ComponentFixture<ListadoDiscusionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoDiscusionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoDiscusionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
