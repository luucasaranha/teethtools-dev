import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "./dashboard/services/authentication/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(
    public authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    if(sessionStorage.getItem("logged-in") === "false") {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

}
