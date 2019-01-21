import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../../Services/Service.services';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})

export class DisplayComponent implements OnInit {
  public data;
  public display;
  public RegisteredEmployees;
  constructor(private router: Router, private service: ServicesService) { }

  ngOnInit() {
    this.display='none'; 
    this.service.AllCourse().subscribe((Response) => {
      this.data = Response;

      console.log(Response);
    })
  }
  CreateCourses() {
    this.router.navigate(['AdminDashboard/AddCourse']);
  }
  events(value){
    console.log(value);
    var data={"Course_ID":value};
    this.service.GetRegisterEmployees(data).subscribe((Response)=>
    {
      if(Response!=null){
        console.log(Response);
        this.RegisteredEmployees=Response;
        this.display='block'; 
      }
    })
  }
  CloseDilog(){
    this.display='none'; 
  }
}
