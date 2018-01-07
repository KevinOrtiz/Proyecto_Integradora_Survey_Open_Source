import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarDiscusionComponent } from './editar-discusion.component';

describe('EditarDiscusionComponent', () => {
  let component: EditarDiscusionComponent;
  let fixture: ComponentFixture<EditarDiscusionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarDiscusionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarDiscusionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
