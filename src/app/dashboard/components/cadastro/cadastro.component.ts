import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CreatePatientService} from "../../services/create-patient/create-patient-service";
import {Location} from "@angular/common";
import {AddressService} from "../../services/address-service/address.service";
import {ToastrService} from "ngx-toastr";
import {CalculateAgeService} from "../../services/calculate-age/calculate-age.service";
import {FormValidationService} from "../../services/form-validation/form-validation.service";

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent implements OnInit{
  birthdate: string;
  age: number;
  originDescriptionDetailed: string;

  isDadosSelected = true;
  isFichaClinicaSelected = false;

  public form: FormGroup;

  constructor(
    private cadastroService: CreatePatientService,
    private formBuilder: FormBuilder,
    private location: Location,
    private addressService: AddressService,
    private toastrService: ToastrService,
    private formValidationService: FormValidationService,
    public calculateAgeService: CalculateAgeService
  ) {
    this.form = this.getFormGroup();
  }

  ngOnInit(): void {
    this.selectDados();
  }

  selectDados(): void {
    this.isDadosSelected = true;
    this.isFichaClinicaSelected = false;
  }

  selectFichaClinica(): void {
    this.isDadosSelected = false;
    this.isFichaClinicaSelected = true;
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
    if (!this.formValidationService.validateForm(this.form)) {
      return
    }

    let json = JSON.stringify(this.form.value.valueOf());

    this.cadastroService.createPatient(json).subscribe({
      next: value => {
        console.log(value)
        this.toastrService.success('Paciente cadastrado com sucesso')
        this.location.back()
      },
      error: err => {
        console.log(err)
        this.toastrService.error('Erro ao cadastrar paciente')
      }
    })
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
