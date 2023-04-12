import { Injectable } from '@angular/core';
import {environment} from "../../../../../environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {PatientMetric} from "../../model/patient-metric";

@Injectable({
  providedIn: 'root'
})
export class PatientMetricsService {

  private readonly devPatientMetricsUrl = environment.baseUrl + '/statistics/patients'

  constructor(private httpClient: HttpClient) { }

  private options = { headers: new HttpHeaders({'Content-Type':'application/json', 'Authorization':'Basic ' + sessionStorage.getItem("loginHash")})};

  getPatientsMetrics() {
    return this.httpClient.get<PatientMetric>(
      this.devPatientMetricsUrl,
      this.options
    )
  }

}
