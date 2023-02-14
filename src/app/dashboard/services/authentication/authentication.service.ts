import {Injectable} from '@angular/core';
import {Auth, authState, signInWithEmailAndPassword, user} from "@angular/fire/auth";
import {from} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  currentUser$ = user(this.auth);
  isUserLoggedIn = false

  constructor(private auth: Auth) { }

  login(username: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, username, password));
  }

  logout() {
    localStorage.setItem("loggedIn", "false")
    return from(this.auth.signOut())
  }

  generateHash(email: string, password: string) {
    return btoa(email + ":" + password)
  }

}
