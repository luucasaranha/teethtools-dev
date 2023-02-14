import {Injectable} from '@angular/core';
import {ActivatedRoute, CanActivate, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  private readonly LOGGED_IN_KEY: string ="loggedIn";

  constructor(
    private route:ActivatedRoute,
    private router: Router
  ) { }

  canActivate(): boolean {
      if (
        sessionStorage.getItem(this.LOGGED_IN_KEY) === null ||
        sessionStorage.getItem(this.LOGGED_IN_KEY) === "false"
      ) {
        console.log("nao esta logado")
        this.router.navigate(['login'])
        return false
      }
      return true
  }
}
