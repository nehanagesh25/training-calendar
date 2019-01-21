import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDetailsViewComponent } from './dashboard-details-view.component';

describe('DashboardDetailsViewComponent', () => {
  let component: DashboardDetailsViewComponent;
  let fixture: ComponentFixture<DashboardDetailsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardDetailsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
