import { Component, OnInit, ChangeDetectionStrategy,ViewChild, TemplateRef } from '@angular/core';
import {startOfDay,endOfDay,subDays,addDays,endOfMonth,isSameDay,isSameMonth, addHours} from 'date-fns';
import { Subject, from } from 'rxjs';
import {CalendarEvent,CalendarEventAction,CalendarEventTimesChangedEvent,CalendarView} from 'angular-calendar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';
import { Router} from '@angular/router';
import{ServicesService}from '../Services/Service.services';
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

  CalendarView = CalendarView;
  public flag=0;
  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };


  ngOnInit() {
    this.user=sessionStorage.getItem("User")
    console.log(this.user);
  }
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
      
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
     
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];
  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true,
      
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: colors.yellow,
      actions: this.actions
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors.blue,
      allDay: true
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: new Date(),
      title: 'A draggable and resizable event',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }
  ];
  activeDayIsOpen: boolean = true;

  constructor(private serv:ServicesService ,private modal: NgbModal,private authService: AuthService,private router:Router) {}

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
    this.user=sessionStorage.getItem("User")
    var data={"User_Name":this.user,"Course_Name":"Python"};
    console.log(this.user);
    this.serv.check(data).subscribe((Response)=>{
      console.log(Response);
      if(Response == "Success"){
    this.flag=1;}});
    this.modal.open(this.modalContent, { size: 'lg' });
  }
  addEvent(): void {
    this.events.push({
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.refresh.next();
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
  Register(){
   
    var data={"User_Name":this.user,"Course_Name":"Python"}
    this.serv.Register(data).subscribe((Response)=>{
      if(Response){
      this.flag=1;
      alert("Registration Success")
    }
      else{
        alert("Registration Failed");
      }
    })
  }
  UnRegister(){
    var data={"User_Name":this.user,"Course_Name":"Python","Reason_For_Unreg":"Avilabel"};
    debugger
    this.serv.UnRegister(data).subscribe((Response)=>{
      if(Response){
      this.flag=0;
      alert("DeRegistration success")
    }
      else{
        alert("DeRegistration Failed");
      }
    })
  }
  }
