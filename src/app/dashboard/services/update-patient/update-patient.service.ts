import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {User} from "../../model/user";
import {environment} from "../../../../../environment";

@Injectable({
  providedIn: 'root'
})
export class UpdatePatientService {
  private readonly updateURL = environment.baseUrl + '/patients/update';

  constructor(private httpClient: HttpClient) {
  }

  updatePatient(id: string, patient: any) {
    const authorizationHeader = new HttpHeaders(
      {
        Authorization: 'Basic ' + sessionStorage.getItem("loginHash")
      });

    return this.httpClient.put(
      this.updateURL + '?id=' + id,
      patient, {
        headers: authorizationHeader
      }
    )
  }

  generateHash(user: User): string {
    return btoa(user.username + ":" + user.password)
  }
}
