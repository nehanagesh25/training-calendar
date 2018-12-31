import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './Router/Router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import{AdminDashboardComponent}from'./admin/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { CalendarModule,DateAdapter } from 'angular-calendar';
import { adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { AuthService,AuthServiceConfig,SocialLoginModule } from 'angularx-social-login';
import { GoogleLoginProvider} from "angularx-social-login";
import { AdminComponent } from './admin/admin.component';
import { CreateCoursesComponent } from './admin/create-courses/create-courses.component';
import{AuthGaurd}from '../app/Services/Auth.guard'
import { FileSelectDirective } from 'ng2-file-upload';

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('128162980094-vjrucn62c4k641l2qled3hc32ot1u59s.apps.googleusercontent.com')
  }
]);
export function provideConfig() {
  return config;
}
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AdminDashboardComponent,
    LoginComponent,
    AdminComponent,
    CreateCoursesComponent,
    FileSelectDirective
  ],
  imports: [
    BrowserModule,
    SocialLoginModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    NgbModule.forRoot(),
    FormsModule,
    FlatpickrModule.forRoot()
  ],
  providers: [AuthService,{
    provide: AuthServiceConfig,
    useFactory: provideConfig
  },AuthGaurd],
  bootstrap: [AppComponent]
})
export class AppModule { }
