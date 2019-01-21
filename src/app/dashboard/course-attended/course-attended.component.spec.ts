import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseAttendedComponent } from './course-attended.component';

describe('CourseAttendedComponent', () => {
  let component: CourseAttendedComponent;
  let fixture: ComponentFixture<CourseAttendedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseAttendedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseAttendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
