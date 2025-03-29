import { TestBed } from '@angular/core/testing';

import { FormulematerielService } from './formulemateriel.service';

describe('FormulematerielService', () => {
  let service: FormulematerielService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormulematerielService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
