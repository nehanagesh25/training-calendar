import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import {AdminDashboardComponent}from '../admin/dashboard/dashboard.component';
import{CreateCoursesComponent}from '../admin/create-courses/create-courses.component';
import { AuthGaurd}from '../Services/Auth.guard';
import{AuthGaurd1}from '../Services/Auth1'
import{AdminComponent}from '../admin/admin.component';
import{DisplayComponent} from '../admin/displayCourseDetails/display.component'
import { from } from 'rxjs';
export const routes: Routes = [
  {path : '', component:LoginComponent},
  {path: 'login', component:LoginComponent},
  {path: 'dashboard', component:DashboardComponent,canActivate:[AuthGaurd]},
  {path:'AdminDashboard',component:AdminComponent,canActivate:[AuthGaurd1],
  children : [
        {path:'view',component:AdminDashboardComponent},
        { path:'AddCourse', component :CreateCoursesComponent},
        {path:'DisplayCourse',component:DisplayComponent}
         ]},
  {path:'**', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
