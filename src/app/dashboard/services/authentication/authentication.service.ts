import { Injectable } from '@angular/core';
import {Auth, authState, signInWithEmailAndPassword} from "@angular/fire/auth";
import {from} from "rxjs";
import {User} from "../../model/user";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  currentUser$ = authState(this.auth);

  constructor(private auth: Auth) { }

  login(username: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, username, password));
  }

  logout() {
    return from(this.auth.signOut())
  }

  generateHash(user: User): string {
    return btoa(user.username + ":" + user.password)
  }


}
