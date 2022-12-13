import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {PatientsService} from "../../services/list-patient/patients.service";
import {User} from "../../model/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private userName: string = '';
  private password: string = '';

  public formData: FormGroup;

  constructor(private router : Router, private service: PatientsService) {
    this.formData = new FormGroup({
      userName: new FormControl(""),
      password: new FormControl(""),
    });
  }

  ngOnInit() {

  }

  onClickSubmit() {
    this.userName = this.formData.value['userName'];
    this.password = this.formData.value['password'];

    console.log("Login page: " + this.userName);
    console.log("Login page: " + this.password);

    this.service.getPatientsAuthenticateMode(new User(this.userName, this.password))
      .subscribe( data => {
        console.log("Is Login Success: " + data);
      });
  }
}
