import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DatasharedService } from './../datashared.service';
import { AutheticationProfileServiceService } from './../AutheticationProfileService.service';
import {
  AuthService,
  GoogleLoginProvider
} from 'angular5-social-login';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  name: any;
  email: any;
  data: any;
  emialId: any;
  firstName: any;
  lastName: any;
  dob: any;
  errres: any;
  errcode: any;
  isModelTrigger: boolean;
  isSignupTrigger: boolean;

  constructor( private socialAuthService: AuthService,
              private autheticationProfileServiceService: AutheticationProfileServiceService,
              public router: Router,
              private dataService: DatasharedService ) {}

  closeClicked() {
    this.isModelTrigger = false;
  }

  signUpClicked() {
    this.isSignupTrigger = false;
  }

  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        this.name = userData.name;
        this.email = userData.email;
        this.autheticationProfileServiceService.getLoggedUserData().subscribe(
          (loggeddata: any) => {
            if (loggeddata.Candidate[0].response[0].code === '200') {
            this.dataService.datafromLogin = loggeddata;
            this.router.navigate(['/home']);
           }
            if (loggeddata.Candidate[0].response[0].code === '206') {
            this.dataService.datafromLogin = loggeddata;
            this.router.navigate(['/register']);
           }
           if (loggeddata.Candidate[0].response[0].code === '401') {
            this.isModelTrigger = true;
            this.errres = 'Error Message: ' + loggeddata.Candidate[0].response[0].message;
            this.errcode = 'Error Code: ' + loggeddata.Candidate[0].response[0].code;
           }
          }
        );
      }
    );
  }
}
