import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CreatePatientService} from "../../services/create-patient/create-patient-service";
import {StringHelper} from "../../helper/string.helper";
import {Location} from "@angular/common";
import {AddressService} from "../../services/address-service/address.service";
import {ToastrService} from "ngx-toastr";
import {CalculateAgeService} from "../../services/calculate-age/calculate-age.service";

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent {

  birthdate: string;
  age: number;
  originDescriptionDetailed: string;

  public form: FormGroup;

  constructor(
    private cadastroService: CreatePatientService,
    private formBuilder: FormBuilder,
    private location: Location,
    private addressService: AddressService,
    private toastrService: ToastrService,
    public calculateAgeService: CalculateAgeService
  ) {
    this.form = this.getFormGroup();
  }

  validateForm(): boolean {
    let formData = this.form.value

    if (StringHelper.isEmpty(formData.name)) {
      this.toastrService.warning("O nome não pode estar vazio", "Atenção")
      return false;
    }

    if (!StringHelper.isDateValid(formData['birthDate'])) {
      this.toastrService.warning('A data de nascimento inserida não é válida', 'Atenção')
      return false;
    }

    if (StringHelper.isEmpty(formData['gender'])) {
      this.toastrService.warning('O genero não pode estar vazio', 'Atenção')
      return false;
    }

    return true;
  }

  checkAddress() {
    const cep = this.form.get('cep').value;

    if (cep != null && cep !== '') {
      this.addressService.searchAddress(cep).subscribe(formData => this.populateForm(formData))
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
    if (!this.validateForm()) {
      return
    }
    let json = JSON.stringify(this.form.value.valueOf());
    this.cadastroService.createPatient(json)
    if (json) {
      this.toastrService.success('Paciente cadastrado com sucesso')
      this.location.back()
    } else {
      this.toastrService.error('Erro ao cadastrar paciente')
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

    if (realValue === null || realValue === "") {
      this.form.controls[elementName].setValue(realValue)
      return
    }


    let formattedValue = realValue.replace(/\D/g, '');
    formattedValue = (formattedValue / 100).toFixed(2) + '';
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
      originDescription: [null],
    });
  }

}
