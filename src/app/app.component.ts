import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "./dashboard/services/authentication/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  isLoggedIn$ = this.authService.isLoggedIn$

  constructor(
    public authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    if(
      sessionStorage.getItem("loggedIn") === null ||
      sessionStorage.getItem("loggedIn") === "false"
    ) {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.router.navigate(['/login']);
    this.isLoggedIn$.next(false);
    sessionStorage.clear()
  }

}
