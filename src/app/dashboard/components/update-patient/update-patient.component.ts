import {Component, OnInit} from '@angular/core';
import {UpdatePatientService} from "../../services/update-patient/update-patient.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {StringHelper} from "../../helper/string.helper";
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-update-patient',
  templateUrl: './update-patient.component.html',
  styleUrls: ['./update-patient.component.scss']
})
export class UpdatePatientComponent implements OnInit {

  public form: FormGroup


  private id: string = ''
  private params: any
  private rawObject: any | undefined

  constructor(
    private updateService: UpdatePatientService,
    private formBuilder: FormBuilder,
    private location: Location,
    private route: ActivatedRoute,
  ) {
    this.form = this.formBuilder.group({
      action: [null],
      address: [null],
      age: [null],
      anniversaryMonth: [null],
      bestCommunicationChannel: [null],
      birthDate: [null],
      cep: [null],
      criticity: [null],
      district: [null],
      email: [null],
      facebook: [null],
      financial: [null],
      gender: [null],
      id: [null],
      instagram: [null],
      investedValue: [null],
      lastVisit: [null],
      name: [null],
      number: [null],
      city: [null],
      state: [null],
      observations: [null],
      openValue: [null],
      origin: [null],
      proceeds: [null],
      speciality: [null],
      status: [null],
      whatsapp: [null]
    });

    this.route.params.subscribe(params => {
      this.params = params
      this.id = params['id']
      this.form = this.formBuilder.group({
        action: [this.params['action']],
        address: [this.params['address']],
        age: [this.params['age']],
        anniversaryMonth: [this.params['anniversaryMonth']],
        bestCommunicationChannel: [this.params['bestCommunicationChannel']],
        birthDate: [this.params['birthDate']],
        cep: [this.params['cep']],
        criticity: [this.params['criticity']],
        district: [this.params['district']],
        email: [this.params['email']],
        facebook: [this.params['facebook']],
        financial: [this.params['financial']],
        gender: [this.params['gender']],
        id: [this.params['id']],
        instagram: [this.params['instagram']],
        investedValue: [this.params['investedValue']],
        lastVisit: [this.params['lastVisit']],
        name: [this.params['name']],
        number: [this.params['number']],
        city: [this.params['city']],
        state: [this.params['state']],
        observations: [this.params['observations']],
        openValue: [this.params['openValue']],
        origin: [this.params['origin']],
        proceeds: [this.params['proceeds']],
        speciality: [this.params['speciality']],
        status: [this.params['status']],
        whatsapp: [this.params['whatsapp']]
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

  submitBtnClick() {
    if (!this.validateForm()) {
      return
    }
    let response = this.updateService.updatePatient(this.id, this.form.value)
    response.subscribe(response => {
      this.rawObject = response

      if (this.id == this.rawObject['id']) {
        alert("Paciente editado com sucesso.")
        this.location.back()
      } else {
        alert("Falha ao editar o paciente.")
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

}
