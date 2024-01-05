import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtsFormComponent } from './courts-form.component';

describe('CourtsFormComponent', () => {
  let component: CourtsFormComponent;
  let fixture: ComponentFixture<CourtsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourtsFormComponent]
    });
    fixture = TestBed.createComponent(CourtsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
