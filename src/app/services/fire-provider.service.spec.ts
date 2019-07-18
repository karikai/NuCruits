import { TestBed } from '@angular/core/testing';

import { FireProviderService } from './fire-provider.service';

describe('FireProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FireProviderService = TestBed.get(FireProviderService);
    expect(service).toBeTruthy();
  });
});
