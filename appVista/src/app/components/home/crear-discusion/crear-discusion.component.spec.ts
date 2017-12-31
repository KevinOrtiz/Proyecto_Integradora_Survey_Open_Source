import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearDiscusionComponent } from './crear-discusion.component';

describe('CrearDiscusionComponent', () => {
  let component: CrearDiscusionComponent;
  let fixture: ComponentFixture<CrearDiscusionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearDiscusionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearDiscusionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
