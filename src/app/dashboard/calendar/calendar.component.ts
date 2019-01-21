import { Component, OnInit, ViewChild , TemplateRef} from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject, from } from 'rxjs';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { AuthService } from 'angular-6-social-login';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import Swal from 'sweetalert2';
import { ServicesService } from 'src/app/Services/Service.services';


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
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class CalendarComponent implements OnInit {
  @ViewChild('modalContent')
  modalContent: TemplateRef<any>;
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  public user;
  public userurl;
  public username;
  public res = 0;
  public flag = 0;
  public reson;
  CalendarView = CalendarView;
  events: CalendarEvent[];
  constructor(private modal: NgbModal, private authService: AuthService, private router: Router, public service: ServicesService, public datepipe: DatePipe) { } 
  ngOnInit() {
   
    this.username=localStorage.getItem('isLoggedIn');
     var data={"User_Name":this.username}
    this.service.GetCalendarDetails(data).subscribe((res: any) => {
      console.log('calender data===>', res)
      this.formatEventsData(res);
    }, (err) => {

    })
  }
  modalData: {
    action: string;
    event: CalendarEvent;
  };
  formatEventsData = (data: any[]) => {
    let temp = [];
    data.forEach((item) => {
      // var fromdate =  new Date(item.FromDate.slice(0, item.FromDate.lastIndexOf(" ")));
      // var todate = new Date(item.ToDate.slice(0, item.ToDate.lastIndexOf(" ")));



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
  }



  

}
