import { TestBed } from '@angular/core/testing';

import { AllarticleService } from './allarticle.service';

describe('AllarticleService', () => {
  let service: AllarticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllarticleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
