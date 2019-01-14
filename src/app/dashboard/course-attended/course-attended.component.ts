import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/Services/Service.services';
import { CoursesAttended } from 'src/app/model/model';

@Component({
  selector: 'app-course-attended',
  templateUrl: './course-attended.component.html',
  styleUrls: ['./course-attended.component.css']
})
export class CourseAttendedComponent implements OnInit {
public courses_attended : CoursesAttended;
  CourseName:CoursesAttended;
  FromDate:CoursesAttended;
  ToDate:CoursesAttended;
  constructor(private service: ServicesService) { }

  ngOnInit() {
    this.service.GetCoursesAttended(name).subscribe((res:any) =>{
      this.courses_attended=res;
      // this.CourseName=res.Course_Name;
      // this.FromDate = res.FromDate;
      // this.ToDate=res.ToDate;
      console.log(res);
    })
  }

}
