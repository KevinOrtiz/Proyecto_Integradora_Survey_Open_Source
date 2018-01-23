import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompartirComponent } from './compartir.component';

describe('CompartirComponent', () => {
  let component: CompartirComponent;
  let fixture: ComponentFixture<CompartirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompartirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompartirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
