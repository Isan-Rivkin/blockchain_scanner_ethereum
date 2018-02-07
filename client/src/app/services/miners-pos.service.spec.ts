/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MinersPosService } from './miners-pos.service';

describe('MinersPosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MinersPosService]
    });
  });

  it('should ...', inject([MinersPosService], (service: MinersPosService) => {
    expect(service).toBeTruthy();
  }));
});
