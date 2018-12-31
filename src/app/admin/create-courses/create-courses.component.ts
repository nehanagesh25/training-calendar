import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import{ServicesService}from '../../Services/Service.services'
const URL = 'http://localhost:3000/api/upload';
@Component({
  selector: 'app-create-courses',
  templateUrl: './create-courses.component.html',
  styleUrls: ['./create-courses.component.css']
})
export class CreateCoursesComponent implements OnInit {

  constructor(private router:Router,private serv:ServicesService) { }
  public Trainers:any;
  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});
  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         console.log('ImageUpload:uploaded:', item, status, response);
         alert('File uploaded successfully');
  }
  this.serv.GetAllTrainers().subscribe((Response)=>{
    console.log(Response);
    this.Trainers=Response;
  })
  debugger
}
  Dash(){
    this.router.navigate(['AdminDashboard'])
  }
}
