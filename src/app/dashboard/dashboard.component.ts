import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject, from } from 'rxjs';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { AuthService } from 'angularx-social-login';
import { Router } from '@angular/router';
import { ServicesService } from '../Services/Service.services';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService} from 'ngx-spinner'
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

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  constructor(private modal: NgbModal, private authService: AuthService, private router: Router, public service: ServicesService, public datepipe:DatePipe,private spinner : NgxSpinnerService) { }

  events: CalendarEvent[];
  ngOnInit() {
    this.spinner.show();
    setTimeout(()=>{
      this.spinner.hide();
    },7000);
    this.service.GetCalendarDetails().subscribe((res: any) => {
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

    
      
      var from = this.datepipe.transform(item.FromDate,'MM-dd-yyyy');
      var to =this.datepipe.transform(item.ToDate,'MM-dd-yyyy');
      console.log("from",from);
      console.log("to",to);

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
      if(item.color = 3){
        alert("No seats available");
      }
      temp.push(item);


    })




    this.events = temp;
    console.log('formatted data-->', temp)
    console.log(this.events);
  }
  // actions: CalendarEventAction[] = [
  //   {
  //     label: '<i class="fa fa-fw fa-pencil"></i>',
  //     onClick: ({ event }: { event: CalendarEvent }): void => {
  //       this.handleEvent('Edited', event);
  //     }
  //   },
  //   {
  //     label: '<i class="fa fa-fw fa-times"></i>',
  //     onClick: ({ event }: { event: CalendarEvent }): void => {
  //       this.events = this.events.filter(iEvent => iEvent !== event);
  //       this.handleEvent('Deleted', event);
  //     }
  //   }
  // ];
  refresh: Subject<any> = new Subject();

  // events: CalendarEvent[] = [
  //   {
  //     start: subDays(startOfDay(new Date()), 1),
  //     end: addDays(new Date(), 1),
  //     CourseID : 1,
  //     CourseName:"string",
  //     Description : "string",
  //     Duration : "string",
  //     FromDate: "string",
  //     ToDate: "String",
  //     Venue: "string",
  //     Last_Date_to_Enroll: "string",
  //     Max_enroll:2 ,
  //     Min_enroll:3,
  //     color: colors.red,
  //   }];

  //   {
  //     start: startOfDay(new Date()),
  //     title: 'An event with no end date',
  //     color: colors.yellow,
  //     actions: this.actions
  //   },
  //   {
  //     start: subDays(endOfMonth(new Date()), 3),
  //     end: addDays(endOfMonth(new Date()), 3),
  //     title: 'A long event that spans 2 months',
  //     color: colors.blue,
  //     allDay: true
  //   },
  //   {
  //     start: addHours(startOfDay(new Date()), 2),
  //     end: new Date(),
  //     title: 'A draggable and resizable event',
  //     color: colors.yellow,
  //     actions: this.actions,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true
  //     },
  //     draggable: true
  //   }

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
  }



  signOut(): void {

    this.authService.signOut();
    this.router.navigate(['login']);
    localStorage.removeItem("isLogin");

  }
  covertJsontoArray(valuedata) {
    console.log(valuedata);

    debugger;
    return JSON.parse(valuedata);
  }
}
