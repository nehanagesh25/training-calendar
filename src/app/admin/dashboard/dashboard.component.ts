import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ServicesService} from '../../Services/Service.services';
import "rxjs/add/operator/map";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class AdminDashboardComponent  {
  public falg=0;
  constructor(private router:Router,private service:ServicesService) { }
 public Todaydata:any ;
 public show:any;
  ngOnInit() {
    if(this.falg){
      this.falg=0;
    }
    this.service.TodayCourse().subscribe((Response)=>{
      this.Todaydata=Response;
      console.log(Response);
      for (let movement of this.Todaydata) {
       var Data={"Course_ID":movement.Course_ID};
        this.service.GetRegisterEmployees(Data).subscribe((res)=>{
          console.log(res);
          this.show=res;
        });
      }
    });
  }
  
}

