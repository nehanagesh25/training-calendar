import { Component, OnInit } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { Router} from '@angular/router';
import{ServicesService}from '../Services/Service.services'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {  
  User_Name:String = '';
  Password: String = "";
    user: SocialUser;  
    constructor(private authService: AuthService,private router:Router,private service:ServicesService) { }  
    ngOnInit() {
      let token=localStorage.getItem('isLogin');
      if(token){
        this.router.navigate(['dashboard']);
      }
    }  
    signInWithGoogle(): void {
      console.log("clicked");
      this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
      this.authService.authState.subscribe((user) => {
        localStorage.setItem('isLogin','true');
        this.service.UserLogin(user).subscribe((response:any)=>{
          console.log(response);
          if(response === 'Success'){
           
            localStorage.setItem('isLogin','true');
            this.router.navigate(['dashboard']);    
              }    
              else{
                
              }
          
        })       
      });
    }   
  
  AdminLogin(){

   console.log(this.User_Name);
   const data1={"User_Name":this.User_Name ,"Password":this.Password}
      this.service.AdminLogin(data1).subscribe((response:any)=>{
        console.log(response);
        if(response === 'Success'){
         
          // localStorage.setItem('isLogin','true');
          this.router.navigate(['AdminDashboard']);    
            }    
            else{
              
            }
        
      });  
  
  }
}