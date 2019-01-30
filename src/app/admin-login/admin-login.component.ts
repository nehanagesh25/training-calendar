import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../Services/Service.services';
import swal from 'sweetalert2';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  User_Name: String = '';
  Password: String = "";

  constructor(private router: Router, private service: ServicesService) { }

  ngOnInit() {
    let token = localStorage.getItem('isLogin');
    if (token) {
      this.router.navigate(['dashboard']);
    }
    let token1 = localStorage.getItem('AdminLogin');
    if (token1) {
      this.router.navigate(['AdminDashboard/view']);
    }
  }
  AdminLogin() {

    console.log(this.User_Name);
    console.log(this.Password);
    const data1 = { "User_Name": this.User_Name, "Password": this.Password }
    this.service.AdminLogin(data1).subscribe((response: any) => {
      console.log(response);
      if (response === 'Success') {
        debugger
        localStorage.setItem('AdminLogin', 'true');
        this.router.navigate(['AdminDashboard/view']);
      }
      else {
        swal("login Failed", 'warning')
      }
    });
  }
}
