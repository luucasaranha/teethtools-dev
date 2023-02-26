import {Injectable} from '@angular/core';
import {Auth, authState, signInWithEmailAndPassword, user} from "@angular/fire/auth";
import {from} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {User} from "../../model/user";
import {environment} from "../../../../../environment";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  currentUser$ = user(this.auth);

  private readonly loginURL =  environment.baseUrl + '/login';

  constructor(private auth: Auth, private httpClient: HttpClient) { }



  login(username: string, password: string) {
    const headers = {'Content-Type': 'application/json' };
    const body = {
      email: username,
      password: password
    };

    console.log("url: " + this.loginURL)

    return this.httpClient.post(
      this.loginURL,
      body,
      { headers }
    )
  }

  // login(username: string, password: string) {
  //   return from(signInWithEmailAndPassword(this.auth, username, password));
  // }

  logout() {
    sessionStorage.clear()
    return from(this.auth.signOut())
  }

  generateHash(email: string, password: string) {
    return btoa(email + ":" + password)
  }

}
