import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../../model/user";

@Injectable({
  providedIn: 'root'
})
export class DeletePatientService {

  private readonly baseURL = 'https://odonto-api-dev.herokuapp.com/api';
  private readonly deleteURL = this.baseURL + '/v1/patients/delete';

  constructor(private httpClient: HttpClient) { }

  deletePatient(patientId: string) {
    const authorizationHeader = new HttpHeaders(
      {
        Authorization: 'Basic ' + this.generateHash(new User('dennis', 'instdenis8569'))
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
