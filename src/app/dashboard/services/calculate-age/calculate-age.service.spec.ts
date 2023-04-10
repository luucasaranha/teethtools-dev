import { TestBed } from '@angular/core/testing';

import { CalculateAgeService } from './calculate-age.service';

describe('CalculateAgeService', () => {
  let service: CalculateAgeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculateAgeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
