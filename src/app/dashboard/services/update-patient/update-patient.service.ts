import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable, isDevMode} from '@angular/core';
import {IPatient} from '../../model/IPatient';
import {environmentDev} from "../../../../../environment.dev";
import {environment} from "../../../../../environment.prod";
import {User} from "../../model/user";

@Injectable({
  providedIn: 'root'
})
export class UpdatePatientService {

  private readonly baseUrl = 'https://odonto-api-dev.herokuapp.com/api'
  private readonly updateURL = this.baseUrl + '/v1/sheet-patients/update';


  constructor(private httpClient: HttpClient) {
  }


  updatePatient(id: string, patient: any) {
    const authorizationHeader = new HttpHeaders(
      {
        Authorization: 'Basic ' + this.generateHash(new User('dennis', 'instdenis8569'))
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
