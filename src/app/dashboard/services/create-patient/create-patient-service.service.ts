import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {User} from "../../model/user";

@Injectable({
  providedIn: 'root'
})
export class CreatePatientServiceService {

  private readonly devBaseUrl = 'https://odonto-api-dev.herokuapp.com/api'
  private readonly devInsertUrl = this.devBaseUrl + '/v1/sheet-patients/insert';

  constructor(private httpClient: HttpClient) { }

  private options = { headers: new HttpHeaders({'Content-Type':'application/json', 'Authorization':'Basic ' + this.generateHash(new User('dennis', 'instdenis8569'))})};

  createPatient(patientJson: string) {
    return this.httpClient.post(
      this.devInsertUrl,
      patientJson,
      this.options
    ).subscribe(response => {
      // console.log(response)
    })
  }

  generateHash(user: User): string {
    return btoa(user.username + ":" + user.password)
  }

}
