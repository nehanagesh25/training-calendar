import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params, Router } from '@angular/router';
import { ServicesService } from 'src/app/Services/Service.services';
import { DatePipe } from '@angular/common';
import { default as Swal } from 'sweetalert2';
@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.css']
})
export class UpdateCourseComponent implements OnInit {
  public data;
  public f;
  public display;
  public RegisteredEmployees;
  public Trainers: any;
  public Course: any;
  public CourseName: any;
  public Discreption: any;
  public Dureation: any;
  public FromDate: any;
  public ToDate: any;
  public MaxEnroll: any;
  public MiniumEnroll: any;
  public LastDate: any;
  public Venue: any;
  public id;
  public courseid;
  public path;
  public flag = 0;
  public FromTime;
  public ToTime;
  public flag1 = 0;
  public cur;
  public trainerid;
  p: number = 1;
  constructor(private router:ActivatedRoute,private rout:Router,private serv:ServicesService, public datepipe: DatePipe) { }

  ngOnInit() {
    this.router.params.subscribe((params:Params)=>{
      this.loadProject(params.id);
    })
    this.serv.GetAllTrainers().subscribe((Response) => {
      console.log(Response);
      this.Trainers = Response;
    })
  }
  loadProject(id){
    this.courseid=id;
    var data = { "Course_ID": id};
    debugger
    this.serv.CourseByID(data).subscribe((Response) => {
      if (Response != null) {
        this.serv.GetEnrollMasterById(data).subscribe((res) => {
          console.log("Getting response",res);
          this.CourseName = Response[0].Course_Name;
          this.Discreption = Response[0].Description;
          this.Dureation = Response[0].Duration;
          this.FromDate = this.datepipe.transform(res[0].FromDate, 'yyyy-MM-dd');
          this.LastDate = this.datepipe.transform(res[0].Last_date_to_enroll, 'yyyy-MM-dd');
          this.MaxEnroll = res[0].Max_enroll;
          this.MiniumEnroll = res[0].Min_enroll;
          this.ToDate = this.datepipe.transform(res[0].ToDate, 'yyyy-MM-dd');
          this.Venue = res[0].Venue;
          this.trainerid=res[0].Trainer_ID
          console.log(this.CourseName);
          console.log(this.Discreption);
        })
      }
    })
  }
  DisplayCourse(){
  this.rout.navigate(['AdminDashboard/DisplayCourse']);
  }
  UpdateCourses() {
    var date1 = new Date(this.FromDate);
    var date2 = new Date(this.ToDate);
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    diffDays=diffDays+1;
    console.log(this.id);
    var data = { 'Course_ID': this.courseid, 'Course_Name': this.CourseName, 'Trainer_ID': this.trainerid, 'Description': this.Discreption, 'Duration': diffDays }
    this.serv.UpdateCourse(data).subscribe((Response) => {
      if (Response) {
        var data1 = { "Trainer_ID": this.trainerid, "Course_ID": this.courseid, "FromDate": this.FromDate, "ToDate": this.ToDate, "Venue": this.Venue, "Last_date_to_enroll": this.LastDate, "Max_enroll": this.MaxEnroll, "Min_enroll": this.MiniumEnroll, "Status": 1 }
        this.serv.Updatemaster(data1).subscribe((Response) => {
          if (Response) {
            this.CourseName = null;
            this.Discreption = null;
            this.Dureation = null;
            this.FromDate = null;
            this.LastDate = null;
            this.MaxEnroll = null;
            this.MiniumEnroll = null;
            this.ToDate = null;
            this.FromDate = null;
            this.Venue = null;
            this.FromTime = null;
            this.ToTime = null;
            Swal("Course Updated ", "SuccessFully!", "success");
            this.display = 'none';
            this.rout.navigate(['AdminDashboard/DisplayCourse']);
          }
        })
      }
    })
  }

}
