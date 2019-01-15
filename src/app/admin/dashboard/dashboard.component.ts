import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject, from } from 'rxjs';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { AuthService } from 'angular-6-social-login';
import { Router } from '@angular/router';
import { ServicesService } from '../Services/Service.services';
import { DatePipe } from '@angular/common';
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

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('modalContent')
  modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();
  public user;
  public userurl;
  public username;
  public res=0;
  public flag = 0;
  public flag1=0;
  public reson;
  modalData: {
    action: string;
    event: CalendarEvent;
  };

  constructor(private modal: NgbModal, private authService: AuthService, private router: Router, public service: ServicesService, public datepipe: DatePipe) { }

  events: CalendarEvent[];
  ngOnInit() {
    this.user = sessionStorage.getItem("User");
    this.userurl=sessionStorage.getItem("Userurl");
    this.username=sessionStorage.getItem("Username");
    console.log(this.user);
    this.service.GetCalendarDetails().subscribe((res: any) => {
      console.log('calender data===>', res)
      this.formatEventsData(res);
    }, (err) => {

    })
  }


  formatEventsData = (data: any[]) => {
    let temp = [];
    data.forEach((item) => {
      var from = this.datepipe.transform(item.FromDate, 'MM-dd-yyyy');
      var to = this.datepipe.transform(item.ToDate, 'MM-dd-yyyy');
      console.log("from", from);
      console.log("to", to);

      item.start = new Date(from);
      item.end = new Date(to);

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
      temp.push(item);
    })
    this.events = temp;
    console.log('formatted data-->', temp)
    console.log(this.events);
  }
  refresh: Subject<any> = new Subject();
  activeDayIsOpen: boolean = true;
  getEventsInPeriod
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
    this.modal.open(this.modalContent, { size: 'lg' });
    this.user = sessionStorage.getItem("User")
    var data = { "User_Name": this.user,"Course_Name":this.modalData.event.title};
    var data1={"Course_Name":this.modalData.event.title};
    debugger
    console.log(this.user);
    this.service.checkforregister(data1).subscribe((Response)=>
    {
      if(Response === "Success"){
        this.flag1=1;
      }
      else{
        this.flag1=0;
      }
    })
    this.service.check(data).subscribe((Response) => {
      console.log(Response);
      if (Response == "Success") {
        this.flag = 1;
      }
    });
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
  covertJsontoArray(valuedata) {
    console.log(valuedata);
    debugger;
    return JSON.parse(valuedata);
  }
  Register() {
    

    var data = { "User_Name": this.user,"Course_Name":this.modalData.event.title }
    this.service.Register(data).subscribe((Response) => {
      if (Response) {
        this.flag = 1;
        Swal("Registration!","Done!","success");
      }
      else {
        Swal("Registration Failed","warning");
      }
    })
  }
  UnRegister() {
    this.res=1;
  }
  UnRegister1(){
    var data = { "User_Name": this.user,"Course_Name":this.modalData.event.title,"Reason_For_Unreg": this.reson };
    debugger
    this.service.UnRegister(data).subscribe((Response) => {
      if (Response) {
        this.flag = 0;
        this.reson=null;
        this.res=0;
        Swal("DeRegistration!","Done!","success"); 
      }
      else {
        Swal("DeRegistration!","warning");
      }
    })
  }
}