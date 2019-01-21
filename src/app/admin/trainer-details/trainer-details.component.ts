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
  public TrainerName : any;
  public TrainerType : any;
  public description : any;

  constructor(private router: Router, private service: ServicesService) { }

  ngOnInit() {
    //var data = {Trainer_Name:this.TrainerName, Trainer_Type:this.TrainerType, Description:this.description }
    this.service.GetAllTrainers().subscribe((Response) => {
      this.data = Response;
      console.log(Response);
    })
  }
  CreateTrainers() {
    this.router.navigate(['AdminDashboard/CreateTrainers']);
  }

}
