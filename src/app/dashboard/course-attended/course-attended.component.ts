import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/Services/Service.services';
import { animate, state, style, transition, trigger } from '@angular/animations';

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
  constructor(private service: ServicesService) { }

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
      result.FromDate = result.FromDate;
      result.ToDate = result.ToDate;

      temp.push(result);
    })
    this.dataSource = temp;
    this.expandedElement = temp;
  }
  dataSource: any[];
  expandedElement: any[];
  columnsToDisplay = ['CourseName', 'FromDate', 'ToDate'];

}
