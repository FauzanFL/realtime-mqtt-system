import { TestBed } from '@angular/core/testing';

import { LocalStorageCache } from './local-storage-cache';

describe('LocalStorageCache', () => {
  let service: LocalStorageCache;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageCache);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
