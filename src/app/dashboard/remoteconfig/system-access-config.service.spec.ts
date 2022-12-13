import {TestBed} from '@angular/core/testing';

import {SystemAccessConfigService} from './system-access-config.service';

describe('SystemAccessConfigService', () => {
  let service: SystemAccessConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SystemAccessConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
