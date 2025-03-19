import { TestBed } from '@angular/core/testing';

import { [MajClass]Service } from './[MinClass].service';

describe('[MajClass]Service', () => {
  let service: [MajClass]Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject([MajClass]Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
