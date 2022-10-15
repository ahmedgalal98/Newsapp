import { TestBed } from '@angular/core/testing';

import { ToparticleService } from './toparticle.service';

describe('ToparticleService', () => {
  let service: ToparticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToparticleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
