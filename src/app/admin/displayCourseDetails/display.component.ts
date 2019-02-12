import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../../Services/Service.services';
import { default as Swal } from 'sweetalert2';
import { DatePipe } from '@angular/common'
@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})

export class DisplayComponent implements OnInit {
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
  constructor(private router: Router, private service: ServicesService, public datepipe: DatePipe) { }

  ngOnInit() {
    this.display = 'none';
    this.service.AllCourse().subscribe((Response) => {
      this.data = Response;

      console.log(Response);
    })
    this.cur = new Date;
    this.service.GetAllTrainers().subscribe((Response) => {
      console.log(Response);
      this.Trainers = Response;
    })
  }
  remove(id) {

    console.log("Removable");
    console.log(id);
    var data = { 'Course_ID': id };
    (Swal as any).fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        (Swal as any).fire(
          this.service.DeleteCourse(data).subscribe((Res) => {
            this.service.Removemaster(data).subscribe((res)=>{
              if (Res != null) {
                Swal("Course deleted ", "SuccessFully!", "success");
                window.location.reload();
              }
              else {
                Swal("Update Error", 'warning')
              }
            })      
          })
        )
      }
    })

  }


  CreateCourses() {
    this.router.navigate(['AdminDashboard/AddCourse']);
  }
  events(value) {

    this.id=value;
    var data = { "Course_ID": value };
    this.service.CourseByID(data).subscribe((Response) => {
      if (Response != null) {
        this.service.GetEnrollMasterById(data).subscribe((res) => {
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
          this.Trainers=res[0].Trainer_ID
        })
      }
    })

    this.service.GetRegisterEmployees(data).subscribe((Response) => {
      if (Response != null) {
        console.log(Response);
        this.RegisteredEmployees = Response;
        this.display = 'block';
      }
    })
  }
  CloseDilog() {
    this.display = 'none';
  }
  edit(id) {
    this.courseid = id;
    this.router.navigate(['AdminDashboard/UpdateCourse/',id]);
    var data = { "Course_ID": this.courseid }
    debugger
    this.service.CourseByID(data).subscribe((Response) => {
      if (Response != null) {
        this.service.GetEnrollMasterById(data).subscribe((res) => {
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

        })
      }
    })
    this.display = 'block';
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
    this.service.UpdateCourse(data).subscribe((Response) => {
      if (Response) {
        var data1 = { "Trainer_ID": this.trainerid, "Course_ID": this.courseid, "FromDate": this.FromDate, "ToDate": this.ToDate, "Venue": this.Venue, "Last_date_to_enroll": this.LastDate, "Max_enroll": this.MaxEnroll, "Min_enroll": this.MiniumEnroll, "Status": 1 }
        this.service.Updatemaster(data1).subscribe((Response) => {
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
            window.location.reload();
          }
        })
      }
    })
    this.router.navigate(['AdminDashboard/DisplayCourse']);
  }
  CloseDilog1() {

    this.display = 'none';
  }
  filterForeCasts(value)
  {
    this.trainerid=value;
  }
}
