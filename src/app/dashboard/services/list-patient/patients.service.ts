import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Patient} from "../../model/Patient";
import {User} from "../../model/user";

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  private readonly baseUrlProd = 'https://odonto-api-app.herokuapp.com/api';
  private readonly baseUrlDev = 'https://odonto-api-dev.herokuapp.com/api'
  private readonly patientsAPI = this.baseUrlDev + '/v1/sheet-patients';

  constructor(private httpClient: HttpClient) {}

  getPatientsAuthenticateMode(user: User) {
    const authorizationHeader = new HttpHeaders({Authorization: 'Basic ' + this.generateHash(user)});

    return this.httpClient
      .get<Patient[]>(this.patientsAPI, { headers: authorizationHeader })
  }

  getPatients() {
    return this.httpClient.get<Patient[]>(this.patientsAPI)
  }

  generateHash(user: User): string {
    return btoa(user.username + ":" + user.password)
  }
}
