import { TestBed } from '@angular/core/testing';

import { FormuleroleService } from './formulerole.service';

describe('FormuleroleService', () => {
  let service: FormuleroleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormuleroleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
