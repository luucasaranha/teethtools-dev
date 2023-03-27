import {Component, OnInit} from '@angular/core';
import {PatientMetricsService} from "../../services/patient-metrics/patient-metrics.service";

@Component({
  selector: 'app-patients-metrics',
  templateUrl: './patients-metrics.component.html',
  styleUrls: ['./patients-metrics.component.scss']
})
export class PatientsMetricsComponent implements OnInit{


  constructor(private metricsService: PatientMetricsService) {
  }

  ngOnInit(): void {

  }





}
