import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { NgxPaginationModule } from 'ngx-pagination';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AppRoutingModule } from './Router/Router';
import { Appsettings } from './App.settings';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminDashboardComponent } from './admin/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { AuthService, AuthServiceConfig, SocialLoginModule } from 'angular-6-social-login';
import { GoogleLoginProvider } from "angular-6-social-login";
import { AdminComponent } from './admin/admin.component';
import { CreateCoursesComponent } from './admin/create-courses/create-courses.component';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';

import { CalendarComponent } from './dashboard/calendar/calendar.component';
import { TableDisplayComponent } from './dashboard/table-display/table-display.component';
import { CoursesAttended } from './model/model';
import { CourseAttendedComponent } from './dashboard/course-attended/course-attended.component';
import { AuthGaurd } from '../app/Services/Auth.guard'
import { AuthGaurd1 } from '../app/Services/Auth1.guard'
import { FileSelectDirective } from 'ng2-file-upload';
import { DisplayComponent } from './admin/displayCourseDetails/display.component';
import { DatePipe } from '@angular/common';
import { Component, Injectable } from '@angular/core';
import { NgbTimeStruct, NgbTimeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { TrainerDetailsComponent } from './admin/trainer-details/trainer-details.component';
import { CreateTrainersComponent } from './admin/create-trainers/create-trainers.component';
import { FilterPipe} from './filter.pipe';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { UpdateCourseComponent } from './admin/displayCourseDetails/update-course/update-course.component';
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
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig([
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider('128162980094-r503vo2ho5r4oct4j8rquln7su9hmcm5.apps.googleusercontent.com')
    }
  ]);
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
    DisplayComponent,
    CalendarComponent,
    TableDisplayComponent,
    CourseAttendedComponent,
    TrainerDetailsComponent,
    CreateTrainersComponent,
    FilterPipe,
    AdminLoginComponent,
    UpdateCourseComponent
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
    FlatpickrModule.forRoot(),
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    NgxPaginationModule
  ],
  providers: [AuthService, {
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  }, AuthGaurd,AuthGaurd1, DatePipe, { provide: NgbTimeAdapter, useClass: NgbTimeStringAdapter }],
  bootstrap: [AppComponent]
})
export class AppModule { }
