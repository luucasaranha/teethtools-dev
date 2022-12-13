import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, of, tap} from 'rxjs';
import {PatientsService} from '../../services/list-patient/patients.service';
import {DeletePatientService} from "../../services/delete-patient/delete-patient.service";
import {UpdatePatientService} from '../../services/update-patient/update-patient.service';
import {fetchAndActivate} from "firebase/remote-config";
import {FirebaseApp} from "@angular/fire/app";
import {getRemoteConfig, RemoteConfig} from "@angular/fire/remote-config";
import {SystemAccessConfigService} from "../../remoteconfig/system-access-config.service";
import {Patient} from "../../model/Patient";
import {MatSort, Sort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
})
export class PatientsComponent implements OnInit, AfterViewInit {
  patientsList: Observable<Patient[]>;
  rawPatientsList: Patient[]

  dataSource: any

  private remoteConfig: RemoteConfig = getRemoteConfig()

  displayedColumns = [
    'name',
    'gender',
    'lastVisit',
    'status',
    'number',
    'anniversaryMonth',
    'actions',
  ];

  @ViewChild(MatSort) sort = new MatSort()

  ngAfterViewInit() {
    // this.setRemoteConfigSettings()
  }

  constructor(
    private patientService: PatientsService,
    private deletePatientService: DeletePatientService,
    private updatePatientService: UpdatePatientService,
    private firebase: FirebaseApp,
    private router: Router,
    private systemAccessConfig: SystemAccessConfigService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    // this.setRemoteConfigSettings();
    this.patientsList = new Observable<Patient[]>()
    this.rawPatientsList = []
  }

  sortData() {
    let sortFunction =
      (items: Patient[], sort: MatSort): Patient[] =>  {
      debugger
        if (!sort.active || sort.direction === '') {
          return items;
        }
        return items.sort((a: Patient, b: Patient) => {
          let comparatorResult = 0;
          switch (sort.active) {
            case 'name':
              comparatorResult = a.name.localeCompare(b.name);
              break;
            case 'gender':
              comparatorResult = a.gender.localeCompare(b.gender);
              break;
            case 'lastVisit':
              comparatorResult = a.lastVisit.localeCompare(b.lastVisit);
              break;
            case 'status':
              comparatorResult = a.status.length - b.status.length;
              break;
            case 'number':
              comparatorResult = a.number.length - b.number.length;
              break;
            case 'anniversaryMonth':
              comparatorResult = a.anniversaryMonth.length - b.anniversaryMonth.length;
              break;
            case 'actions':
              comparatorResult = a.action.length - b.action.length;
              break;
            default:
              comparatorResult = a.name.localeCompare(b.name);
              break;
          }
          return comparatorResult * (sort.direction == 'asc' ? 1 : -1);
        });
      };
    return sortFunction;
  }

  async getPatients() {
    this.patientsList = this.patientService.getPatients();
    this.patientsList.subscribe(patient => {
      this.rawPatientsList = patient
      this.dataSource = new MatTableDataSource(patient)
      this.dataSource.sortData = this.sortData();
      this.dataSource.sort = this.sort
      console.log(this.dataSource)
      console.log(this.dataSource.sort)
    })
  }

  async retrieveRemoteConfigData() {
    this.systemAccessConfig.retrieveRemoteConfigData().then((hasAccess) => {
      if (hasAccess) {
        this.patientsList = this.patientService.getPatients();
        this.patientsList.subscribe(patient => {
          this.rawPatientsList = patient
          this.dataSource = new MatTableDataSource(patient)
          this.dataSource.sort = this.sort
          console.log(this.dataSource)
          console.log(this.dataSource.sort)
        })
      } else {
        this.navigateToUnavailablePage()
      }
    })
  }


  private setRemoteConfigSettings() {
    this.remoteConfig.defaultConfig = require('../../../../../remote_config_defaults.json');
    this.remoteConfig.settings.minimumFetchIntervalMillis = 3600000;
  }

  ngOnInit(): void {
    this.getPatients()

    // fetchAndActivate(this.remoteConfig).then(() => {
    //   this.retrieveRemoteConfigData()
    // })
  }

  onAdd() {
    this.navigateToCadastroPage()
  }

  onUpdate(element: any) {
    this.navigateToUpdatePage(element)
  }

  onDelete(element: any) {
    let deleted = this.deletePatientService.deletePatient(element['id'])
    if (deleted) {
      alert("Paciente " + element['name'] + " deletado com sucesso")
      this.reloadList()
    } else {
      alert("Falha ao deletar o paciente")
    }
  }

  onFilterByName(element: any) {
    let filteredList: Patient[] = []
    let name = element.target.value.toLowerCase()

    this.rawPatientsList.filter(patient => {
      if (patient.name.toLowerCase().includes(name)) {
        filteredList.push(patient)
      }
    })

    this.patientsList = of(filteredList)
  }

  reloadList() {
    this.patientsList = this.patientService.getPatients()
  }

  navigateToUnavailablePage() {
    this.router.navigate(['system-unavailable'])
  }

  navigateToCadastroPage() {
    this.router.navigate(['cadastro'])
  }

  navigateToUpdatePage(element: any) {
    this.router.navigate(['update-patient', element])
  }
}
