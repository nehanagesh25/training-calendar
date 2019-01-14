import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../../Services/Service.services';


@Component({
  selector: 'app-trainer-details',
  templateUrl: './trainer-details.component.html',
  styleUrls: ['./trainer-details.component.css']
})
export class TrainerDetailsComponent implements OnInit {

  public data;
  constructor(private router: Router, private service: ServicesService) { }

  ngOnInit() {
    this.service.GetAllTrainers().subscribe((Response) => {
      this.data = Response;
      console.log(Response);
    })
  }
  CreateCourses() {
    this.router.navigate(['AdminDashboard/AddTrainer']);
  }

}
