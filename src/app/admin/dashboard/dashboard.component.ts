import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
public falg=0;
  constructor(private router:Router) { }

  ngOnInit() {
  }
  CreateEvents(){
    console.log("Click")
    //this.router.navigate(['dashdetail']);
    this.falg=1;

    
  }
  Dash(){
    this.router.navigate(['AdminDashboard'])
  }

}
