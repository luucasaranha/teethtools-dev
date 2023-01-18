import { Injectable } from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {AuthenticationService} from "../authentication/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(
    public authService: AuthenticationService,
    public router: Router
  ) { }

  canActivate(): boolean {
    if (!this.authService.currentUser$) {
      this.router.navigate(['login']);
      return false
    }
    return true
  }

}
