import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {PatientsService} from '../../services/list-patient/patients.service';
import {DeletePatientService} from "../../services/delete-patient/delete-patient.service";
import {Patient} from "../../model/Patient";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {HttpErrorResponse} from "@angular/common/http";
import {ResponseError} from "../../model/error";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
})
export class PatientsComponent implements OnInit {
  public displayedColumns = [
    'name',
    'lastVisit',
    'gender',
    'status',
    'number',
    'anniversaryMonth',
    'actions',
  ];

  private paginator!: MatPaginator;
  private sort!: MatSort;

  dataSource!: MatTableDataSource<Patient>;
  loading: boolean = true;

  constructor(
    private patientService: PatientsService,
    private deletePatientService: DeletePatientService,
    private router: Router,
    private toastrService: ToastrService
  ) {
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
  }

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();

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
          this.toastrService.success('Paciente ' + element['name'] + ' deletado com sucesso')
          this.loadList()
        },
        error: err => {
          const errorObj = (err as HttpErrorResponse).error
          const parsedError = (JSON.parse(JSON.stringify(errorObj))) as ResponseError
          this.toastrService.error(parsedError.errorMessage)
        }
      })
  }

  private loadList() {
    this.patientService.retrievePatients().subscribe({
      next: (response) => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.matSort;
        this.loading = false;
      },
      error: (error) => {
        this.toastrService.error('Ocorreu um erro, tente novamente mais tarde')
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

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
