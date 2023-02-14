import {Injectable} from '@angular/core';
import {ActivatedRoute, CanActivate, Router} from "@angular/router";
import {AuthenticationService} from "../authentication/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(
    public authService: AuthenticationService,
    private route:ActivatedRoute,
    private router: Router
  ) { }

  canActivate(): boolean {
      if (sessionStorage.getItem("loggedIn") === "false") {
        this.router.navigate(['login'])
        return false
      }
      return true
  }
}
