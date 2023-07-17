import { TestBed } from '@angular/core/testing';

import { ECommService } from './seller.service';

describe('ECommService', () => {
  let service: ECommService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ECommService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
