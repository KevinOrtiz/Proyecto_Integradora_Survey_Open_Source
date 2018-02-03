import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestasCompartidasComponent } from './encuestas-compartidas.component';

describe('EncuestasCompartidasComponent', () => {
  let component: EncuestasCompartidasComponent;
  let fixture: ComponentFixture<EncuestasCompartidasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncuestasCompartidasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncuestasCompartidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
