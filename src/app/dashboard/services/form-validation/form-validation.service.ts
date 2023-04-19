import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {StringHelper} from "../../helper/string.helper";

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {
  constructor(private toastrService: ToastrService) {}

  validateForm(form: FormGroup): boolean {
    let formData = form.value;

    if (StringHelper.isEmpty(formData.name)) {
      this.toastrService.warning("O nome precisa ser preenchido", "Atenção")
      return false;
    }

    if (!StringHelper.isDateValid(formData['birthDate'])) {
      this.toastrService.warning('A data de nascimento precisa estar inserida no formato DD/MM/AAAA', 'Atenção')
      return false;
    }

    if (StringHelper.isEmpty(formData['gender'])) {
      this.toastrService.warning('O genero precisa ser preenchido', 'Atenção')
      return false;
    }

    return true;
  }
}
