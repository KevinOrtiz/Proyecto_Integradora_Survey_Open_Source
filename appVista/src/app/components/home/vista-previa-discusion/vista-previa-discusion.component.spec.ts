import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaPreviaDiscusionComponent } from './vista-previa-discusion.component';

describe('VistaPreviaDiscusionComponent', () => {
  let component: VistaPreviaDiscusionComponent;
  let fixture: ComponentFixture<VistaPreviaDiscusionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaPreviaDiscusionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaPreviaDiscusionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
