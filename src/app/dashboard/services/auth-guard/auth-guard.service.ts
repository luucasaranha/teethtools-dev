import {Injectable} from '@angular/core';
import {CanActivate, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  private readonly LOGGED_IN_KEY: string ="loggedIn";

  constructor(
    private router: Router
  ) { }

  canActivate(): boolean {
      if (
        sessionStorage.getItem(this.LOGGED_IN_KEY) === null ||
        sessionStorage.getItem(this.LOGGED_IN_KEY) === "false"
      ) {
        this.router.navigate(['login'])
        return false
      }
      return true
  }
}
