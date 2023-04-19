import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from "../../../../../environment";

@Injectable({
  providedIn: 'root'
})
export class CreatePatientService {

  private readonly devInsertUrl = environment.baseUrl + '/patients/insert';

  constructor(private httpClient: HttpClient) { }

  private options = { headers: new HttpHeaders({'Content-Type':'application/json', 'Authorization':'Basic ' + sessionStorage.getItem("loginHash")})};

  createPatient(patientJson: string) {
    return this.httpClient.post(
      this.devInsertUrl,
      patientJson,
      this.options
    )
  }

}
