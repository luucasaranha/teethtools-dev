import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {PatientsService} from "../../services/list-patient/patients.service";
import {User} from "../../model/user";
import {AuthenticationService} from "../../services/authentication/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
    }
  )

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {

  }


  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  submit() {
    if(!this.loginForm.valid) {
      return;
    }

    const {email, password} = this.loginForm.value;
    this.authService.login(email!, password!).subscribe(() => {
      this.router.navigate(['/home']);
    })
  }

  // onClickSubmit() {
  //   this.userName = this.formData.value['userName'];
  //   this.password = this.formData.value['password'];
  //
  //   console.log("Login page: " + this.userName);
  //   console.log("Login page: " + this.password);
  //
  //   this.service.getPatientsAuthenticateMode(new User(this.userName, this.password))
  //     .subscribe( data => {
  //       console.log("Is Login Success: " + data);
  //     });
  // }
}
