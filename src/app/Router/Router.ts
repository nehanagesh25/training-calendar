import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGaurd1 } from '../Services/Auth1.guard'
import { LoginComponent } from '../login/login.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AdminComponent } from '../admin/admin.component';
import { from } from 'rxjs';
import { AdminDashboardComponent } from '../admin/dashboard/dashboard.component';
import { CreateCoursesComponent } from '../admin/create-courses/create-courses.component';
import { AuthGaurd } from '../Services/Auth.guard';
import { TableDisplayComponent } from '../dashboard/table-display/table-display.component';
import { CalendarComponent } from '../dashboard/calendar/calendar.component';
import { DisplayComponent } from '../admin/displayCourseDetails/display.component';
import { CourseAttendedComponent } from '../dashboard/course-attended/course-attended.component';
import { TrainerDetailsComponent } from '../admin/trainer-details/trainer-details.component';
import { CreateTrainersComponent } from '../admin/create-trainers/create-trainers.component';
import { AdminLoginComponent } from '../admin-login/admin-login.component';
import { UpdateCourseComponent } from '../admin/displayCourseDetails/update-course/update-course.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component:AdminLoginComponent },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGaurd],
    children: [
      { path: 'table', component: TableDisplayComponent },
      { path: 'calendar', component: CalendarComponent },
      { path: 'courses-attended', component: CourseAttendedComponent }
    ]
  },
  {
    path: 'AdminDashboard', component: AdminComponent, canActivate: [AuthGaurd1],
    children: [
      { path: 'view', component: AdminDashboardComponent },
      { path: 'AddCourse', component: CreateCoursesComponent },
      { path: 'DisplayCourse', component: DisplayComponent },
      { path: 'TrainerDetails', component: TrainerDetailsComponent },
      { path: 'CreateTrainers', component: CreateTrainersComponent },
      {path:'UpdateCourse/:id',component:UpdateCourseComponent}
    ]
  },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
