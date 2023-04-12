import {Component, OnInit} from '@angular/core';
import {PatientMetricsService} from "../../services/patient-metrics/patient-metrics.service";
import {PatientMetric} from "../../model/patient-metric";

@Component({
  selector: 'app-patients-metrics',
  templateUrl: './patients-metrics.component.html',
  styleUrls: ['./patients-metrics.component.scss']
})
export class PatientsMetricsComponent implements OnInit{

  public patientMetric: PatientMetric

  constructor(private metricsService: PatientMetricsService) {
  }

  ngOnInit(): void {
    this.loadPatientsMetrics();
  }

  loadPatientsMetrics() {
    this.metricsService.getPatientsMetrics().subscribe({
      next: (value: PatientMetric) => {
        console.log("patients metric: ", value)
        this.patientMetric = value
      },
      error: err => {
       console.error(err)
      }
    });
  }



}
