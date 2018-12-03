import { Component, OnInit } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {  
  
    user: SocialUser;  
    constructor(private authService: AuthService,private router:Router) { }  
    ngOnInit() {
    
    }  
    signInWithGoogle(): void {
      console.log("clicked");
      this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
      this.authService.authState.subscribe((user) => {
        this.user = user;
        console.log(user);
        this.router.navigate(['dashboard']);
        
      });
    }   
    signOut(): void {
      this.authService.signOut();
    }
  
  }
  