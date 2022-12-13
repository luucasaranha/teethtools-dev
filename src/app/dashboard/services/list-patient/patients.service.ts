import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {IPatient} from '../../model/IPatient';
import {first, tap} from 'rxjs/operators';
import {Patient} from "../../model/Patient";
import {User} from "../../model/user";

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  private readonly baseURL = 'https://odonto-api-dev.herokuapp.com/api';
  private readonly patientsAPI = this.baseURL + '/v1/sheet-patients';

  constructor(private httpClient: HttpClient) {}

  getPatientsAuthenticateMode(user: User) {
    const authorizationHeader = new HttpHeaders({Authorization: 'Basic ' + this.generateHash(user)});

    return this.httpClient
      .get<Patient[]>(this.patientsAPI, { headers: authorizationHeader })
      .pipe(
        first(),
        tap((patients) => {
          // console.log(patients)
        })
      );
  }

  getPatients() {
    return this.httpClient
      .get<Patient[]>(this.patientsAPI)
      .pipe(
        first(),
        tap((patients) => {
          // console.log(patients)
        })
      );
  }




  generateHash(user: User): string {
    return btoa(user.username + ":" + user.password)
  }
}
