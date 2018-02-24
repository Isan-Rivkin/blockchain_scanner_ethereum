/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UsersCountingService } from './users-counting.service';

describe('UsersCountingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersCountingService]
    });
  });

  it('should ...', inject([UsersCountingService], (service: UsersCountingService) => {
    expect(service).toBeTruthy();
  }));
});
