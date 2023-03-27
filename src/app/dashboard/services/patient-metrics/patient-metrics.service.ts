import { Injectable } from '@angular/core';
import {environment} from "../../../../../environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PatientMetricsService {

  private readonly devPatientMetricsUrl = environment.baseUrl + '/statistics/patients/gender'

  constructor(private httpClient: HttpClient) { }

  private options = { headers: new HttpHeaders({'Content-Type':'application/json', 'Authorization':'Basic ' + sessionStorage.getItem("loginHash")})};

  patientsFullStatistics() {
    return this.httpClient.get(
      this.devPatientMetricsUrl,
      this.options
    )
  }

}
