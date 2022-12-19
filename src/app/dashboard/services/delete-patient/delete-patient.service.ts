import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DeletePatientService {

  private readonly baseURL = 'https://odonto-api-dev.herokuapp.com/api';
  private readonly deleteURL = this.baseURL + '/v1/sheet-patients/delete';

  constructor(private httpClient: HttpClient) { }

  deletePatient(patientId: string) {
    // if(userAuthenticated()) {
    //
    // }
    return this.httpClient.delete(
      this.deleteURL + '?id=' + patientId,
      {}
    )
  }
}
