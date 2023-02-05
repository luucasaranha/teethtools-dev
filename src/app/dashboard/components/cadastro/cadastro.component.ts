import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CreatePatientService} from "../../services/create-patient/create-patient-service";
import {StringHelper} from "../../helper/string.helper";
import {Location} from "@angular/common";

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent implements OnInit {

  public form: FormGroup;
  private zeroValue: string = "R$ 0,00";

  constructor(
    private cadastroService: CreatePatientService,
    private formBuilder: FormBuilder,
    private location: Location,
  ) {

    this.form = this.formBuilder.group({
      name: [null],
      gender: [null],
      age: [null],
      birthDate: [null],
      address: [null],
      cep: [null],
      district: [null],
      city: [null],
      state: [null],
      origin: [null],
      number: [null],
      whatsapp: [null],
      instagram: [null],
      facebook: [null],
      email: [null],
      bestCommunicationChannel: [null],
      status: [null],
      criticity: [null],
      speciality: [null],
      proceeds: [null],
      action: [null],
      observations: [null],
      financial: [null],
      investedValue: [null],
      openValue: [null],
    });
  }

  ngOnInit(): void {
  }

  validateForm(): boolean {
    let formData = this.form.value

    if(StringHelper.isEmpty(formData.name)) {
      alert("Campo nome deve ser preenchido");
      return false;
    }

    if(!StringHelper.isDateValid(formData['birthDate'])) {
      alert("Campo data com valor inválido");
      return false;
    }

    return true;
  }

  submitBtnClick() {
    if(!this.validateForm()) {
      return
    }
    let json = JSON.stringify(this.form.value.valueOf());
    this.cadastroService.createPatient(json)
    if (json) {
      alert("Paciente cadastrado com sucesso.")
      this.location.back()
    } else {
      alert("Falha ao cadastrar o paciente.")
    }
  }

  onBackPressed() {
    this.location.back()
  }

  formatCurrencyOnKeyPress(elementName: string) {
    this.formatCurrency(elementName)
  }

  formatCurrency(elementName: any) {
    let realValue = this.form.value[elementName]

    if(realValue === null || realValue === "") {
      this.form.controls[elementName].setValue(realValue)
      return
    }


    let formattedValue = realValue.replace(/\D/g,'');
    formattedValue = (formattedValue/100).toFixed(2) + '';
    formattedValue = formattedValue.replace(".", ",");
    formattedValue = formattedValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

    this.form.controls[elementName].setValue('R$ ' + formattedValue)
  }

}
