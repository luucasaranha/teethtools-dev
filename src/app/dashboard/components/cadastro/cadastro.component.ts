import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CreatePatientService} from "../../services/create-patient/create-patient-service";
import {StringHelper} from "../../helper/string.helper";
import { Location} from "@angular/common";
import {AddressService} from "../../services/address-service/address.service";
import {CurrencyUtils} from "../../utils/currency.util";
import {PatientForm} from "../../model/patient.form";
import {CameraService} from "../../services/camera-service/camera.service";
import * as stream from "stream";

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent implements OnInit {

  public form: FormGroup;

  patientForm: PatientForm = {
    id: null,
    name: null,
    gender: null,
    lastVisit: null,
    age: null,
    birthDate: null,
    address: null,
    cep: null,
    district: null,
    city: null,
    state: null,
    origin: null,
    number: null,
    whatsapp: null,
    instagram: null,
    facebook: null,
    email: null,
    bestCommunicationChannel: null,
    status: null,
    criticity: null,
    speciality: null,
    proceeds: null,
    action: null,
    observations: null,
    financial: null,
    investedValue: null,
    openValue: null
  };

  constructor(
    private cadastroService: CreatePatientService,
    private formBuilder: FormBuilder,
    private location: Location,
    private addressService: AddressService,
    private cameraService: CameraService
  ) {
    this.form = this.formBuilder.group(this.patientForm)
  }

  @ViewChild('imageElement') imageElement: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement') canvasElement: ElementRef<HTMLCanvasElement>;

  selectedFile: File = null;
  fileName = '';
  imageUrl: string = null;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.fileName = this.selectedFile.name;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  clickInput() {
    const input = document.querySelector('input[type=file]') as HTMLInputElement;
    input.click();
  }

  async captureImage() {
    this.cameraService.captureImage(this.imageElement, this.canvasElement).then(stream => {
      console.log(stream)
    })
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
    this.addressService.searchAddress(cep).subscribe(formData => this.populateForm(formData))
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

  valueFieldsOnKeyPress(elementName: string) {
    this.form.controls[elementName]
      .setValue(CurrencyUtils.formatCurrency(this.form.value[elementName]))
  }

}
