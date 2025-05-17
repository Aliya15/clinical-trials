import { TestBed } from '@angular/core/testing';

import { TrialsService } from './trials.service';

describe('TrialsService', () => {
  let service: TrialsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrialsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
