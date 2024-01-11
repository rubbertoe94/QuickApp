import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonsFormComponent } from './lessons-form.component';

describe('LessonsFormComponent', () => {
  let component: LessonsFormComponent;
  let fixture: ComponentFixture<LessonsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LessonsFormComponent]
    });
    fixture = TestBed.createComponent(LessonsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
