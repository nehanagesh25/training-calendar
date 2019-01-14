import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../Services/Service.services';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  public falg = 0;
  constructor(private router: Router, private service: ServicesService) { }
  public Todaydata: any;
  public show: any;
  CreateEvents() {
    console.log("Click")
    this.router.navigate(['AdminDashboard/DisplayCourse']);
    this.falg = 1;
  }

  TrainerDetails(){
    this.router.navigate(['AdminDashboard/TrainerDetails']);
  }
  
  Dash() {
    this.falg = 0;
    this.router.navigate(['AdminDashboard/view']);
  }


}
