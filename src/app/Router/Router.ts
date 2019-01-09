import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import {AdminDashboardComponent}from '../admin/dashboard/dashboard.component';
import{CreateCoursesComponent}from '../admin/create-courses/create-courses.component';
import {DashboardDetailsViewComponent}from '../admin/dashboard-details-view/dashboard-details-view.component'
import { AuthGaurd}from '../Services/Auth.guard'
import { CourseAttendedComponent } from '../dashboard/course-attended/course-attended.component';
export const routes: Routes = [
  {path : '', component:LoginComponent},
  {path: 'login', component:LoginComponent},
  //{path:'courseAttended', component:CourseAttendedComponent},
  {
    path: 'dashboard', component:DashboardComponent,
    children : [
             { path:'Course', component :CourseAttendedComponent}
              ]},

   {path:'AdminDashboard',component:AdminDashboardComponent},
   {path:'dashdetail',component:DashboardDetailsViewComponent,
   children : [
         { path:'AddCourse', component :CreateCoursesComponent}
          ]},
  // {path:'**', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
