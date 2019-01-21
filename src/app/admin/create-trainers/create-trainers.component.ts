import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../../Services/Service.services';
import { default as swal } from 'sweetalert2';


@Component({
  selector: 'app-create-trainers',
  templateUrl: './create-trainers.component.html',
  styleUrls: ['./create-trainers.component.css']
})
export class CreateTrainersComponent implements OnInit {

  public flag = 0;
  public Trainers: any;
  public id: any;
  public TrainerID: number;
  public TrainerName: any;
  public TrainerType: any;
  public TrainerData: any;
  public Description: any;
  public Trainer_Type: any = [{ name: 'Accionite', value: 1 }, { name: 'Guest', value: 0 }];

  constructor(private router: Router, private serv: ServicesService) { }

  ngOnInit() {
    this.serv.GetAllTrainers().subscribe((Response) => {
      console.log(Response);
      this.Trainers = Response;
    })
  }

  AddTrainers() {
    var data = { 'Trainer_Name': this.TrainerName, 'Trainer_Type': this.TrainerType, 'Description': this.Description }
    this.serv.CreateTrainers(data).subscribe((res: any) => {
      console.log(res);
      if (res != null) {
        swal("Trainer added ", "SuccessFully!", "success");
      }
      else {
        swal("Error in Adding", 'warning')
      }
      this.flag = 0;
    });
  }
  filterForeCasts(value) {
    this.TrainerID = value;
    console.log(this.id);
    var data = { "Trainer_ID": this.TrainerID }
    this.serv.GetTrainerByID(data).subscribe((res) => {
      console.log(res);
      this.Description = Response[0].Description;
    });

  }

  UpdateTrainers() {
    var data = { 'Trainer_ID': this.TrainerID, 'Trainer_Name': this.TrainerName, 'Trainer_Type': this.TrainerData, 'Description': this.Description }
    this.serv.UpdateTrainers(data).subscribe((res: any) => {
      console.log(res);
      if (res) {
        this.TrainerName = null;
        this.Description = null;
        this.TrainerData = null;
        swal("Trainer Updated ", "SuccessFully!", "success");
        this.flag = 0;
      }
      else {
        swal("Update Error", 'warning')
      }
      this.flag = 0;
    });
  }

  filterForeCasts1(value) {
    this.TrainerID = value;
    console.log(this.TrainerID);
  }
  DeleteTrainer() {
    var data = { Trainer_ID: this.TrainerID }
    this.serv.RemoveTrainerdetails(data).subscribe((Res) => {
      if (Res != null) {
        swal("Trainer deleted ", "SuccessFully!", "success");
      }
      else {
        swal("Update Error", 'warning')
      }
    })
    // this.router.navigate(['AdminDashboard/TrainerDetails'])
  }
}
