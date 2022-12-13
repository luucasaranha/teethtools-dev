import {TestBed} from '@angular/core/testing';

import {CreatePatientServiceService} from './create-patient-service.service';

describe('CreatePatientServiceService', () => {
  let service: CreatePatientServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatePatientServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
