import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
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
import { DisplayComponent } from './admin/displayCourseDetails/display.component';
import { DatePipe } from '@angular/common';
import {Component, Injectable} from '@angular/core';
import {NgbTimeStruct, NgbTimeAdapter} from '@ng-bootstrap/ng-bootstrap';

/**
 * Example of a String Time adapter
 */
@Injectable()
export class NgbTimeStringAdapter extends NgbTimeAdapter<string> {

  fromModel(value: string): NgbTimeStruct {
    if (!value) {
      return null;
    }
    const split = value.split(':');
    return {
      hour: parseInt(split[0], 10),
      minute: parseInt(split[1], 10),
      second: parseInt(split[2], 10)
    };
  }

  toModel(time: NgbTimeStruct): string {
    if (!time) {
      return null;
    }
    return `${this.pad(time.hour)}:${this.pad(time.minute)}:${this.pad(time.second)}`;
  }

  private pad(i: number): string {
    return i < 10 ? `0${i}` : `${i}`;
  }
}
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
    FileSelectDirective,
    DisplayComponent
  ],
  imports: [
    BrowserModule,
    SocialLoginModule,
    AngularFontAwesomeModule,
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
  },AuthGaurd,DatePipe,{provide: NgbTimeAdapter, useClass: NgbTimeStringAdapter}],
  bootstrap: [AppComponent]
})
export class AppModule { }
