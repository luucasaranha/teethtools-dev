import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreatePatientServiceService {
  private readonly prdBaseUrl = 'https://odonto-api-app.herokuapp.com/api';
  private readonly prdInsertUrl = this.prdBaseUrl + '/v1/sheet-patients/insert';

  // Use environmentDev variable to avoid code like this
  private readonly devBaseUrl = 'https://odonto-api-dev.herokuapp.com/api'
  private readonly devInsertUrl = this.devBaseUrl + '/v1/sheet-patients/insert';

  constructor(private httpClient: HttpClient) { }

  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  createPatient(patientJson: string) {
    return this.httpClient.post(
      this.devInsertUrl,
      patientJson,
      this.options
    ).subscribe(response => {
      // console.log(response)
    })
  }
}
