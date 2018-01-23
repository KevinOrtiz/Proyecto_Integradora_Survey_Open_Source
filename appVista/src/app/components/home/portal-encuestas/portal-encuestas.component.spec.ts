import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalEncuestasComponent } from './portal-encuestas.component';

describe('PortalEncuestasComponent', () => {
  let component: PortalEncuestasComponent;
  let fixture: ComponentFixture<PortalEncuestasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalEncuestasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalEncuestasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
