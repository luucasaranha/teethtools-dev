import { TestBed } from '@angular/core/testing';

import { PatientFormSharedServiceService } from './patient-form-shared-service.service';

describe('PatientFormSharedServiceService', () => {
  let service: PatientFormSharedServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientFormSharedServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
