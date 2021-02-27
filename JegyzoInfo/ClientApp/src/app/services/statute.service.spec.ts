import { TestBed } from '@angular/core/testing';

import { StatuteService } from './statute.service';

describe('StatuteService', () => {
  let service: StatuteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatuteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
