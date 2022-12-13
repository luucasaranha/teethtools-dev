import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {IPatient} from '../../model/IPatient';

@Injectable({
  providedIn: 'root'
})
export class UpdatePatientService {

  private readonly baseURL = 'https://odonto-api-dev.herokuapp.com/api';
  private readonly updateURL = this.baseURL + '/v1/sheet-patients/update';
  private readonly patientsAPI = this.baseURL + '/v1/sheet-patients';

  constructor(private httpClient: HttpClient) {
  }


  updatePatient(id: string, patient: any) {
    return this.httpClient.put(
      this.updateURL + '?id=' + id,
      patient
    )
  }
}
