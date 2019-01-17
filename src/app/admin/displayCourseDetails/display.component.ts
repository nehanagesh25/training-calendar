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
  constructor(private router: Router, private service: ServicesService) { }

  ngOnInit() {
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
  }
}
