import { TestBed } from '@angular/core/testing';

import { RamadanTimeService } from './ramadan-time.service';

describe('RamadanTimeService', () => {
  let service: RamadanTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RamadanTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
