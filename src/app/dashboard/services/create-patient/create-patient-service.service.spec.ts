import {TestBed} from '@angular/core/testing';
import { CreatePatientService } from './create-patient-service';

describe('CreatePatientServiceService', () => {
  let service: CreatePatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatePatientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
