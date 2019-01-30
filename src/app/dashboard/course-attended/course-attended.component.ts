import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/Services/Service.services';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DatePipe } from '@angular/common';

export interface CourseDetails {
  CourseName: string;
  FromDate: string;
  ToDate: string;
}
@Component({
  selector: 'app-course-attended',
  templateUrl: './course-attended.component.html',
  styleUrls: ['./course-attended.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class CourseAttendedComponent implements OnInit {
  public username;
  constructor(private service: ServicesService , public datepipe:DatePipe) { }

  ngOnInit() {
    this.username = localStorage.getItem('isLoggedIn');
    var name = { "User_Name": this.username }
    this.service.GetCoursesAttended(name).subscribe((res: any) => {
      console.log(res);
      this.getData(res);
    })

  }


  getData = (data: any[]) => {
    let temp = [];
    data.forEach((result) => {
      console.log("result=", result);
      result.CourseName = result.Course_Name;
      var from = result.FromDate;
      result.FromDate = this.datepipe.transform(from, "MMM-dd-yyyy");
      var to = result.ToDate;
      result.ToDate = this.datepipe.transform(to, "MMM-dd-yyyy");

      temp.push(result);
    })
    this.dataSource = temp;
    this.expandedElement = temp;
  }
  dataSource: any[];
  expandedElement: any[];
  columnsToDisplay = ['CourseName', 'FromDate', 'ToDate'];

}
