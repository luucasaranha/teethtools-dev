import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {PatientsService} from '../../services/list-patient/patients.service';
import {DeletePatientService} from "../../services/delete-patient/delete-patient.service";
import {Patient} from "../../model/Patient";
import {User} from "../../model/user";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {LoadingService} from "../../services/loading-service/loading.service";

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
})
export class PatientsComponent implements OnInit {
  public displayedColumns = [
    'name',
    'gender',
    'lastVisit',
    'status',
    'number',
    'anniversaryMonth',
    'actions',
  ];

  private paginator!: MatPaginator;
  private sort!: MatSort;

  dataSource!: MatTableDataSource<Patient>;
  loading: boolean = true;

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }
  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();

  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(
    private patientService: PatientsService,
    private deletePatientService: DeletePatientService,
    private router: Router,
    public loaderService: LoadingService
  ) {
  }

  ngOnInit() {
    this.loadList()
  }

  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
  }

  public onAdd() {
    this.navigateToCadastroPage()
  }

  public onUpdate(element: any) {
    this.navigateToUpdatePage(element)
  }

  public onDelete(element: any) {
    this.deletePatientService.deletePatient(element['id'])
      .subscribe({
        complete: () => {
          alert("Paciente " + element['name'] + " deletado com sucesso")
          this.loadList()
        },
        error: err => {
          alert("Ocorreu um erro ao deletar o paciente")
          console.log(err)
        }
      })
  }

  private loadList() {
    this.patientService.getPatientsAuthenticateMode(new User("dennis", "instdenis8569")).subscribe({
      next: (response) => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.matSort;
        this.loading = false;
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
