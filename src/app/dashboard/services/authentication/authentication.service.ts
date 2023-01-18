import { Injectable } from '@angular/core';
import {Auth, authState, signInWithEmailAndPassword} from "@angular/fire/auth";
import {from} from "rxjs";
import {User} from "../../model/user";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  currentUser$ = authState(this.auth);

  constructor(
    private auth: Auth
  ) { }

  login(username: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, username, password));
  }

  logout() {
    return from(this.auth.signOut())
  }

  generateHash(email: string, password: string) {
    return btoa(email + ":" + password)
  }

}
