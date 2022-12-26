import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {PatientsService} from '../../services/list-patient/patients.service';
import {DeletePatientService} from "../../services/delete-patient/delete-patient.service";
import {Patient} from "../../model/Patient";
import {User} from "../../model/user";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import * as moment from 'moment';

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

  dataSource!: MatTableDataSource<Patient>;

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  constructor(
    private patientService: PatientsService,
    private deletePatientService: DeletePatientService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.loadList()
  }

  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
  }

  private invalidDate: string = 'Invalid date';

  parseDate(date: string) {
    let formattedDate = (moment(date)).format('DD-MM-YYYY')
    if(formattedDate === this.invalidDate) {
      console.log("this is not a date: " + date)
    } else {
      console.log(formattedDate)
    }
  }

  sortData() {
    let sortFuction: any = 
      (items: Patient[], sort: MatSort): Patient[] => {
        if(!sort.active || sort.direction === '' ) {
          return items
        }
        return items.sort((a: Patient, b: Patient) => {
          let comparatorResult = 0;
          switch (sort.active) {
              case 'lastVisit':
              this.parseDate(a.lastVisit)
              comparatorResult = a.lastVisit.localeCompare(b.lastVisit);
              break;
    
            case 'status':
             comparatorResult = a.status.localeCompare(b.status);
             break;
       
            default:
              comparatorResult = a.name.localeCompare(b.name);
              break;
          }
          return comparatorResult * (sort.direction == 'asc' ? 1 : -1);
         });
       };
       return sortFuction
  }

  ngAfterViewInit() {
    
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
        this.dataSource.sortData = this.sortData();
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
