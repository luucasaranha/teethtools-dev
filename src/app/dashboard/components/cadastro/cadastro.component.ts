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

  public form: FormGroup;
 // Região da data
  pipe = new DatePipe('pt-BR')

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

  calculateAge() {
    const birthDate = this.form.get('birthDate').value;

    // Recupera a data presente
    const dateNow = Date.now();

    // Pipe para formatar a data
    const formattedDate = this.pipe.transform(dateNow, 'short')

    if(birthDate){
      const convertAge = new Date(birthDate);
      console.log("convertAge",convertAge)

      // Calculo de diferença entre as datas
      const timeDiff = Math.abs( - convertAge.getTime());
      console.log("timeDiff",timeDiff)
      const calculatedAge = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
      this.form.patchValue({
        age: calculatedAge
      })
      console.log("Calculated Age", calculatedAge)
      console.log("Age", this.form.get('age').value)
    }
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
