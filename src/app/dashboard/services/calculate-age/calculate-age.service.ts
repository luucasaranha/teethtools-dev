import { Injectable } from '@angular/core';
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class CalculateAgeService {

  constructor() { }

  parseDateString(dateString: string): Date {
    const [day, month, year] = dateString.split('/');
    return new Date(Number(year), Number(month) - 1, Number(day));
  }

  calculateAge(birthdate: string, form: FormGroup) {
    if(birthdate === '') {
      form.patchValue({
        age: null
      });
      return;
    }

    const birthdateDate = this.parseDateString(birthdate);

    const diff = new Date().getTime() - birthdateDate.getTime();
    const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));

    form.patchValue({
      age: age
    });

  }
}
