import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { ServicesService } from '../../Services/Service.services'
import { Appsettings } from 'src/app/App.seetings';
import { course } from './Shared/Course';
import { parse } from 'date-fns';
import { DatePipe } from '@angular/common';
import { NgbTimeStruct, NgbTimeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { default as swal } from 'sweetalert2';
const URL = Appsettings.BASE_URL + Appsettings.SaveFile;

@Component({
  selector: 'app-create-courses',
  templateUrl: './create-courses.component.html',
  styleUrls: ['./create-courses.component.css']
})
export class CreateCoursesComponent implements OnInit {

  constructor(private router: Router, private serv: ServicesService, public datepipe: DatePipe) { }
  public Trainers: any;
  public Course: any;
  public CourseName: any;
  public Discreption: any;
  public Dureation: any;
  public FromDate: Date;
  public ToDate: Date;
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
  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' });
  ngOnInit() {
    this.cur=new Date;
    
    this.uploader.onAfterAddingFile = (File) => { File.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.path = item.file.name;
      debugger
      console.log('ImageUpload:uploaded:', item, status, response);
      swal("Upload!", "Completed", "success");

    }
    this.serv.GetAllTrainers().subscribe((Response) => {
      console.log(Response);
      this.Trainers = Response;
    })
    this.serv.AllCourse().subscribe((Response) => {
      console.log("all courses");
      console.log(Response);
      this.Course = Response;
    })
    debugger
  }
  Dash() {
    this.router.navigate(['AdminDashboard'])
  }
  SubmitCourses() {
    var date = this.datepipe.transform(this.FromDate, 'dd-MM-yyyy');
    console.log(date);
    debugger
    var data = { 'Course_Name': this.CourseName, 'Trainer_ID': this.id, 'Description': this.Discreption, 'Duration': this.Dureation, 'Attachment': this.path }
    console.log(data);
    this.serv.AddCourse(data).subscribe((res) => {
      this.serv.GetCourseid().subscribe((res) => {
        this.courseid = +res;
        var data1 = { "Trainer_ID": this.id, "Course_ID": this.courseid, "FromDate": this.FromDate, "ToDate": this.ToDate, "Venue": this.Venue, "Last_date_to_enroll": this.LastDate, "Max_enroll": this.MaxEnroll, "Min_enroll": this.MiniumEnroll, "Status": 1 }
        this.serv.CreateEnrollmaster(data1).subscribe((Response) => {
          console.log("resposce second");
          console.log(Response);
          if (Response) {
            swal("Course Created !", "Successfuly", "success");
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
            this.router.navigate(['AdminDashboard/DisplayCourse']);
          }
          else {
            alert("Error");
          }
        })
      })
    })

  }
  filterForeCasts(value) {
    this.id = value;
    console.log(this.id);
  }
  back(){
    this.router.navigate(['AdminDashboard/DisplayCourse']);
  }
 }
