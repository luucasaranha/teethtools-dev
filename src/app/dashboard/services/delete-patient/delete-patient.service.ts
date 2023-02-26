import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../../model/user";
import {environment} from "../../../../../environment";

@Injectable({
  providedIn: 'root'
})
export class DeletePatientService {

  private readonly baseURL = 'https://odonto-api-dev.herokuapp.com/api';
  private readonly deleteURL = environment.baseUrl + '/patients/delete';

  constructor(private httpClient: HttpClient) { }

  deletePatient(patientId: string) {
    const authorizationHeader = new HttpHeaders(
      {
        Authorization: 'Basic ' + sessionStorage.getItem("loginHash")
      });

    // if(userAuthenticated()) {
    //
    // }
    return this.httpClient.delete(
      this.deleteURL + '?id=' + patientId,
      {headers: authorizationHeader}
    )
  }

  generateHash(user: User): string {
    return btoa(user.username + ":" + user.password)
  }

}
