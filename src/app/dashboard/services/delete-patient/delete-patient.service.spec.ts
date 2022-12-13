import {TestBed} from '@angular/core/testing';

import {DeletePatientService} from './delete-patient.service';

describe('DeletePatientService', () => {
  let service: DeletePatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeletePatientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
