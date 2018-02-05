/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ExplorerAgentService } from './explorer-agent.service';

describe('ExplorerAgentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExplorerAgentService]
    });
  });

  it('should ...', inject([ExplorerAgentService], (service: ExplorerAgentService) => {
    expect(service).toBeTruthy();
  }));
});
