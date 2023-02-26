import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {User} from "../../model/user";

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
  ) {
  }

  ngOnInit() {

  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  submit() {
    if (!this.loginForm.valid) {
      return;
    }

    const {email, password} = this.loginForm.value;


    this.authService.login(email!, password!)
      .subscribe({
        next: data => {
          console.log(data)
          sessionStorage.setItem("loginHash", this.generateHash(email!, password!))
          sessionStorage.setItem("loggedIn", "true")
          this.router.navigate(['/patients']);
        },
        error: () => {
          alert("credenciais inválidas")
          this.clearForm()
        }
      })
  }

  generateHash(email: string, password: string): string {
    return btoa(email + ":" + password)
  }

  clearForm() {
    this.loginForm.reset()
  }

}
