import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PatientFormSharedServiceService {
  private formData = new BehaviorSubject<any>(null);
  formData$ = this.formData.asObservable();

  constructor() { }

  updateFormData(formData: any) {
    this.formData.next(formData);
  }

}
