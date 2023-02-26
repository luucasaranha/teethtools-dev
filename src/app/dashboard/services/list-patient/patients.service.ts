import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Patient} from "../../model/Patient";
import {User} from "../../model/user";
import {environment} from "../../../../../environment";

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  private readonly patientsAPI = environment.baseUrl + '/patients';

  constructor(private httpClient: HttpClient) {}

  retrievePatients() {
    const authorizationHeader = new HttpHeaders({
      Authorization: 'Basic ' + sessionStorage.getItem("loginHash")
    });

    return this.httpClient
      .get<Patient[]>(this.patientsAPI, { headers: authorizationHeader })
  }

}
