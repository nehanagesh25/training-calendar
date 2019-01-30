import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../../Services/Service.services';
import { default as Swal } from 'sweetalert2';
import { FilterPipe }from '../../filter.pipe';

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
  public id: number;
  public display;
  public trainerid: any;
  public TrainerData:any;
  public Trainer_Type: any = [{ name: 'Accionite', value: true }, { name: 'Guest', value: false }];
  public searchText;
  p: number = 1;
  constructor(private router: Router, private service: ServicesService) { }

  ngOnInit() {
    this.fecthTrainers(); 
  }
  
  fecthTrainers(){
    this.service.GetAllTrainers().subscribe((Response) => {
      this.data = Response;
      console.log(Response);
    })
  }
  
  CreateTrainers() {
    this.router.navigate(['AdminDashboard/CreateTrainers']);
  }
  CloseDilog1() {
    this.display = 'none';
  }
  remove(id) {

    console.log("Removable");
    console.log(id);
    var data = { 'Trainer_ID': id };
    (Swal as any).fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        (Swal as any).fire(
          this.service.RemoveTrainerdetails(data).subscribe((Res) => {
            if (Res != null) {
              Swal("Trainer deleted ", "SuccessFully!", "success");
              window.location.reload();  
            }
            else {
              Swal("Update Error", 'warning')
            }

          })
        )
      }
    })
    
  }

  //edit
  edit(id) {
    console.log("IDDDDDDDD");
    console.log(id);
    this.trainerid = id;
  
    var data = { "Trainer_ID": this.trainerid }
  
    this.service.GetTrainersByID(data).subscribe((Response) => {
      if (Response != null) 
          console.log(Response);
          this.TrainerName = Response[0].Trainer_Name;
          this.description = Response[0].Description;
          this.TrainerData=Response[0].Trainer_Type;
    })
    
    this.display = 'block';
     
  }

  //update trainers

  UpdateTrainers() {
    var data = { 'Trainer_ID':this.trainerid,'Trainer_Name': this.TrainerName, 'Description': this.description, 'Trainer_Type':this.TrainerData }
    this.service.UpdateTrainers(data).subscribe((Response) => {
      if (Response) {
       
            Swal("Trainers Updated ", "SuccessFully!", "success");
            this.display = 'none';
            window.location.reload();  
          }
          
        })
  
    this.router.navigate(['AdminDashboard/TrainerDetails']);
   
  }
}
