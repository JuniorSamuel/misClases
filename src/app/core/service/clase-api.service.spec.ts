import { TestBed } from '@angular/core/testing';

import { ClaseApiService } from './clase-api.service';

describe('ClaseApiService', () => {
  let service: ClaseApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClaseApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
