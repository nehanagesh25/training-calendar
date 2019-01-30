import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject, from } from 'rxjs';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { AuthService } from 'angular-6-social-login';
import { Router } from '@angular/router';
import { ServicesService } from '../Services/Service.services';
import { DatePipe } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import Swal from 'sweetalert2';

const colors: any = {
  1: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },//red
  2: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },//blue
  3: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }//yellow
};
export interface CourseDetails {
  CourseName: string;
  TrainerName: string;
  Duration: string;
  description: string;
  FromDate: string;
  ToDate: string;
  LastDateToEnroll: string;
  Venue: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class DashboardComponent implements OnInit {


  constructor(private modal: NgbModal, private authService: AuthService, private router: Router, public service: ServicesService) { } 
public userurl;
public username;
public user;
  ngOnInit() {
    this.user = localStorage.getItem('isLoggedIn');
    this.userurl=sessionStorage.getItem('Userurl');
    this.username=sessionStorage.getItem('Username')
    this.router.navigate(['dashboard/table']);

  }
  toTable(){
    this.router.navigate(['dashboard/table']);
  }
  toCalendar(){
    this.router.navigate(['dashboard/calendar']);
  }

  toCourse(){
    this.router.navigate(['dashboard/courses-attended'])

  }
  signOut(): void {
    this.authService.signOut();
    localStorage.removeItem("isLogin");

    this.router.navigate(['login']);
    sessionStorage.removeItem("User");
    window.localStorage.clear();
    window.sessionStorage.clear();
  }
}
