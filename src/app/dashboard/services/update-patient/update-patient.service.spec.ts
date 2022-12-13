import {TestBed} from '@angular/core/testing';

import {UpdatePatientService} from './update-patient.service';

describe('UpdatePatientService', () => {
  let service: UpdatePatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdatePatientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
