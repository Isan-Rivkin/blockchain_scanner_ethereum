/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EtherDataService } from './ether-data.service';

describe('EtherDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EtherDataService]
    });
  });

  it('should ...', inject([EtherDataService], (service: EtherDataService) => {
    expect(service).toBeTruthy();
  }));
});
