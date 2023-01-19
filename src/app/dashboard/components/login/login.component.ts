import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
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
    if (!this.loginForm.valid) {
      return;
    }

    const {email, password} = this.loginForm.value;

    this.authService.login(email!, password!)
      .subscribe({
        complete: () => {
          this.router.navigate(['/patients']);
        },
        error: () => {
          alert("credenciais inválidas")
          this.clearForm()
        }
      })
  }

  clearForm() {
    this.loginForm.get('email')?.setValue("")
    this.loginForm.get('password')?.setValue("")
  }

}
