import { TestBed } from '@angular/core/testing';

import { FindmatchService } from './findmatch.service';

describe('FindmatchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FindmatchService = TestBed.get(FindmatchService);
    expect(service).toBeTruthy();
  });
});
