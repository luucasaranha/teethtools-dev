import {Component, OnInit} from '@angular/core';
import {Form, FormBuilder, FormGroup} from '@angular/forms';
import {CreatePatientService} from "../../services/create-patient/create-patient-service";
import {StringHelper} from "../../helper/string.helper";
import {DatePipe, Location} from "@angular/common";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {Route, Router, Routes} from "@angular/router";
import {AddressService} from "../../services/address-service/address.service";

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent implements OnInit {

  birthdate: string;
  age: number;

  public form: FormGroup;

  constructor(
    private cadastroService: CreatePatientService,
    private formBuilder: FormBuilder,
    private location: Location,
    private addressService: AddressService,
  ) {
    this.form = this.getFormGroup();
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

  checkAddress(){
    const cep = this.form.get('cep').value;

    if (cep != null && cep !== '') {
      this.addressService.searchAddress(cep).subscribe(formData => this.populateForm(formData))
    }
  }

  parseDateString(dateString: string): Date {
    const [day, month, year] = dateString.split('/');
    return new Date(Number(year), Number(month) - 1, Number(day));
  }

  calculateAge() {
    if(this.birthdate === '') {
      this.age = null;
      return;
    }

    const birthdateDate = this.parseDateString(this.birthdate);

    const diff = new Date().getTime() - birthdateDate.getTime();
    const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));

    this.age = age;
  }


  populateForm(formData: any) {
    this.form.patchValue({
      address: formData.logradouro,
      district: formData.bairro,
      city: formData.localidade,
      state: formData.uf

    })
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

  private getFormGroup() {
    return this.formBuilder.group({
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

}
