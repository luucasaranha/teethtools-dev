import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {PatientsService} from '../../services/list-patient/patients.service';
import {DeletePatientService} from "../../services/delete-patient/delete-patient.service";
import {UpdatePatientService} from '../../services/update-patient/update-patient.service';
import {FirebaseApp} from "@angular/fire/app";
import {Patient} from "../../model/Patient";
import {User} from "../../model/user";

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
})
export class PatientsComponent implements OnInit {

  public patientsList: Observable<Patient[]> = new Observable<Patient[]>();
  private rawPatientsList: Patient[] = []

  public searchText: string = ''

  public displayedColumns = [
    'name',
    'gender',
    'lastVisit',
    'status',
    'number',
    'anniversaryMonth',
    'actions',
  ];

  constructor(
    private patientService: PatientsService,
    private deletePatientService: DeletePatientService,
    private updatePatientService: UpdatePatientService,
    private firebase: FirebaseApp,
    private router: Router,
  ) {
    this.getPatients()
  }

  private getPatients() {
    this.patientsList = this.patientService
      .getPatientsAuthenticateMode(
        new User('dennis', 'instdenis8569')
      );

    this.patientsList.subscribe(patient => {
      this.rawPatientsList = patient
    })
  }

  ngOnInit(): void {}

  public onAdd() {
    this.navigateToCadastroPage()
  }

  public onUpdate(element: any) {
    console.log(JSON.stringify(element))
    this.navigateToUpdatePage(element)
  }

  public onDelete(element: any) {
    this.deletePatientService.deletePatient(element['id'])
      .subscribe({
        complete: () => {
          alert("Paciente " + element['name'] + " deletado com sucesso")
          this.reloadList()
        },
        error: err => {
          alert("Ocorreu um erro ao deletar o paciente")
          console.log(err)
        }
      })
  }

  public onFilterByName(element: any) {
    let filteredList: Patient[] = []
    let name = element.target.value.toLowerCase()

    this.rawPatientsList.filter(patient => {
      if (patient.name.toLowerCase().includes(name)) {
        filteredList.push(patient)
      }
    })

    this.patientsList = of(filteredList)
  }

  private reloadList() {
    this.patientService.getPatients().subscribe({
      next: (response) => {
        this.rawPatientsList = response
        this.patientsList = of(response)
      },
      error: (error) => {
        alert("Ocorreu um erro, tente novamente mais tarde")
        console.log(error)
      }
    })
  }

  private navigateToCadastroPage() {
    this.router.navigate(['cadastro'])
  }

  private navigateToUpdatePage(element: any) {
    this.router.navigate(['update-patient', element])
  }
}
