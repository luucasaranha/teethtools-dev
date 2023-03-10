import {Component, OnInit} from '@angular/core';
import {UpdatePatientService} from "../../services/update-patient/update-patient.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {StringHelper} from "../../helper/string.helper";
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {AddressService} from "../../services/address-service/address.service";
import {CurrencyUtils} from "../../utils/currency.util";

@Component({
  selector: 'app-update-patient',
  templateUrl: './update-patient.component.html',
  styleUrls: ['./update-patient.component.scss']
})
export class UpdatePatientComponent implements OnInit {

  public form: FormGroup

  private id: string = ''
  private params: any

  constructor(
    private updateService: UpdatePatientService,
    private formBuilder: FormBuilder,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private addressService: AddressService
  ) {
    this.form = this.formBuilder.group({
      id: [null],
      criticity: [null],
      lastVisit: [null],
      name: [null],
      origin: [null],
      birthDate: [null],
      age: [null],
      gender: [null],
      status: [null],
      anniversaryMonth: [null],
      address: [null],
      cep: [null],
      district: [null],
      number: [null],
      city: [null],
      state: [null],
      whatsapp: [null],
      instagram: [null],
      facebook: [null],
      email: [null],
      bestCommunicationChannel: [null],
      speciality: [null],
      proceeds: [null],
      financial: [null],
      investedValue: [null],
      openValue: [null],
      action: [null],
      observations: [null],
    });

    this.route.params.subscribe(params => {
      this.params = params
      this.id = params['id']
      this.form = this.formBuilder.group({
        id: [this.params['id']],
        criticity: [this.params['criticity']],
        lastVisit: [this.params['lastVisit']],
        name: [this.params['name']],
        origin: [this.params['origin']],
        birthDate: [this.params['birthDate']],
        age: [this.params['age']],
        gender: [this.params['gender']],
        status: [this.params['status']],
        anniversaryMonth: [this.params['anniversaryMonth']],
        address: [this.params['address']],
        cep: [this.params['cep']],
        district: [this.params['district']],
        number: [this.params['number']],
        city: [this.params['city']],
        state: [this.params['state']],
        whatsapp: [this.params['whatsapp']],
        instagram: [this.params['instagram']],
        facebook: [this.params['facebook']],
        email: [this.params['email']],
        bestCommunicationChannel: [this.params['bestCommunicationChannel']],
        speciality: [this.params['speciality']],
        proceeds: [this.params['proceeds']],
        financial: [this.params['financial']],
        investedValue: [this.params['investedValue']],
        openValue: [this.params['openValue']],
        action: [this.params['action']],
        observations: [this.params['observations']]
      });

    })
  }

  ngOnInit() {

  }

  validateForm(): boolean {
    let formData = this.form.value

    if (StringHelper.isEmpty(formData.name)) {
      alert("Campo nome deve ser preenchido");
      return false;
    }

    if (!StringHelper.isDateValid(formData['birthDate'])) {
      alert("Campo data com valor inválido");
      return false;
    }

    return true;
  }

  checkAddress(){
    const cep = this.form.get('cep').value;
    this.addressService.searchAddress(cep).subscribe(formData => this.populateForm(formData)) // TODO: Tratamento para erro da API
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

    this.updateService.updatePatient(this.id, this.form.value).subscribe({
      next: () => {
        alert("Paciente editado com sucesso.")
        this.router.navigate(['patients'])
      },
      error: err => {
        alert("Falha ao editar o paciente.}")
        console.log(err)
      }
    })
  }

  onBackPressed() {
    this.location.back()
  }

  valueFieldOnKeyPress(elementName: string) {
    this.form.controls[elementName]
      .setValue(CurrencyUtils.formatCurrency(this.form.value[elementName]))
  }

}
