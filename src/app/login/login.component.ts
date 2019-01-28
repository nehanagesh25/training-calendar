import { Component, OnInit } from '@angular/core';
import { AuthService} from 'angular-6-social-login';
import { SocialUser } from 'angular-6-social-login';
import { GoogleLoginProvider } from 'angular-6-social-login';
import { Router } from '@angular/router';
import { ServicesService } from '../Services/Service.services'
import { store } from '@angular/core/src/render3';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  User_Name: String = '';
  Password: String = "";
  public store;
  user = new SocialUser();
  constructor(private socialAuthService: AuthService, private router: Router, private service: ServicesService) { }
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
  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform == "google") {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(userData);
        this.router.navigate(['dashboard']);
        this.store = userData;
        const data1 = { "User_Name": userData.email };
        sessionStorage.setItem("User", userData.email);
        sessionStorage.setItem("Userurl", userData.image);
        sessionStorage.setItem("Username", userData.name);
        localStorage.setItem("isLoggedIn",userData.email);
        localStorage.setItem('isLogin', 'true');
        this.service.UserLogin(data1).subscribe((response: any) => {
          console.log(response);
          if (response === 'Success') {
            localStorage.setItem('isLogin', 'true');
            localStorage.setItem('isLoggedIn', userData.email);
            this.router.navigate(['dashboard/table']);
          }
          else {
            swal("Not Applicable");
          }

        })
      });
  }
}