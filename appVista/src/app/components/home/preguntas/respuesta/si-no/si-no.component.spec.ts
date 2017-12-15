import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiNoComponent } from './si-no.component';

describe('SiNoComponent', () => {
  let component: SiNoComponent;
  let fixture: ComponentFixture<SiNoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiNoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiNoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
