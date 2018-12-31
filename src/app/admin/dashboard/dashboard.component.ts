import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ServicesService} from '../../Services/Service.services';
import "rxjs/add/operator/map";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
public falg=0;
  constructor(private router:Router,private service:ServicesService) { }
 public Todaydata:any ;
  ngOnInit() {
    if(this.falg){
      this.falg=0;
    }
    this.service.TodayCourse().subscribe((Response)=>{
      this.Todaydata=Response;
      console.log(Response);
    });
  }
  CreateEvents(){
    console.log("Click")
    this.router.navigate(['AdminDashboard/AddCourse']);
    this.falg=1;

    
  }
  Dash(){
    this.falg=0;
    this.router.navigate(['AdminDashboard']);
  }

}
