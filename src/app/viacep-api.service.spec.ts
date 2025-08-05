import { TestBed } from '@angular/core/testing';

import { ViacepApiService } from './viacep-api.service';

describe('ViacepApiService', () => {
  let service: ViacepApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViacepApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
