import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLabelCategoriesComponent } from './add-label-categories.component';

describe('AddLabelCategoriesComponent', () => {
  let component: AddLabelCategoriesComponent;
  let fixture: ComponentFixture<AddLabelCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLabelCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLabelCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
