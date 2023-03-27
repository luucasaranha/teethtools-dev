import { TestBed } from '@angular/core/testing';

import { PatientMetricsService } from './patient-metrics.service';

describe('PatientMetricsService', () => {
  let service: PatientMetricsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientMetricsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
