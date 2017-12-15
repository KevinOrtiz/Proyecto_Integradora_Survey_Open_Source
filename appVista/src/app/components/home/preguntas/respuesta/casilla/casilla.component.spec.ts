import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasillaComponent } from './casilla.component';

describe('CasillaComponent', () => {
  let component: CasillaComponent;
  let fixture: ComponentFixture<CasillaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasillaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
