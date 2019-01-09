import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject, from } from 'rxjs';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';
import { Router } from '@angular/router';
import { ServicesService } from '../Services/Service.services';
import { DatePipe } from '@angular/common';
const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('modalContent')
  modalContent: TemplateRef<any>;
  public user;
  view: CalendarView = CalendarView.Month;
  public res=0;
  CalendarView = CalendarView;
  public flag = 0;
  viewDate: Date = new Date();
  public reson;
  modalData: {
    action: string;
    event: CalendarEvent;
  };

  events: CalendarEvent[];
  ngOnInit() {
    this.user = sessionStorage.getItem("User")
    console.log(this.user);
    this.serv.GetCalendarDetails().subscribe((res: any) => {
      console.log('calender data===>', res)
      this.formatEventsData(res);
    }, (err) => {

    })
  }
  formatEventsData = (data: any[]) => {
    let temp = [];
    data.forEach((item) => {
      // var fromdate =  new Date(item.FromDate.slice(0, item.FromDate.lastIndexOf(" ")));
      // var todate = new Date(item.ToDate.slice(0, item.ToDate.lastIndexOf(" ")));



      var from = this.datepipe.transform(item.FromDate, 'MM-dd-yyyy');
      var to = this.datepipe.transform(item.ToDate, 'MM-dd-yyyy');
      console.log(to)

      item.start = new Date(from);
      item.end = new Date(to);

      // item.start = new Date(item.FromDate);
      // item.end = new Date(item.ToDate);

      item.title = item.Course_Name;
      item.color = item.ColorType;

      if (item.color == 1) {
        item.color = colors[item.color];
      }
      else if (item.color == 2) {
        item.color = colors[item.color];
      }
      else {
        item.color = colors[item.color];
      }
      console.log(item.CourseID);
      temp.push(item);


    })




    this.events = temp;
    console.log('formatted data-->', temp)
    console.log(this.events);
  }
  refresh: Subject<any> = new Subject();
  getEventsInPeriod

  activeDayIsOpen: boolean = true;

  constructor(private serv: ServicesService, public datepipe:DatePipe, private modal: NgbModal, private authService: AuthService, private router: Router) { }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {

    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }
  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }
  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    debugger
    this.modal.open(this.modalContent, { size: 'lg' });

    this.user = sessionStorage.getItem("User")
    var data = { "User_Name": this.user, "Course_Name": this.modalData.event.Course_Name};
    debugger
    console.log(this.user);
    this.serv.check(data).subscribe((Response) => {
      console.log(Response);
      if (Response == "Success") {
        this.flag = 1;
      }
    });
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  signOut(): void {


    this.authService.signOut();
    debugger
    localStorage.removeItem("isLogin");

    this.router.navigate(['login']);
    sessionStorage.removeItem("User");
    window.localStorage.clear();
    window.sessionStorage.clear();


  }
  Register() {

    var data = { "User_Name": this.user, "Course_Name":this.modalData.event.Course_Name }
    this.serv.Register(data).subscribe((Response) => {
      if (Response) {
        this.flag = 1;
        alert("Registration Success")
      }
      else {
        alert("Registration Failed");
      }
    })
  }
  UnRegister() {
    this.res=1;
  }
  UnRegister1(){
    var data = { "User_Name": this.user, "Course_Name": this.modalData.event.Course_Name, "Reason_For_Unreg": this.reson };
    debugger
    this.serv.UnRegister(data).subscribe((Response) => {
      if (Response) {
        this.flag = 0;
        this.reson=null;
        this.res=0;
        alert("DeRegistration success")
      }
      else {
        alert("DeRegistration Failed");
      }
    })
  }
  covertJsontoArray(valuedata) {
    console.log(valuedata);

    debugger;
    return JSON.parse(valuedata);
  }
}
