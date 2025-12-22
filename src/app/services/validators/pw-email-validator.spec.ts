import { TestBed } from '@angular/core/testing';

import { PwEmailValidator } from './pw-email-validator';

describe('PwEmailValidator', () => {
  let service: PwEmailValidator;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PwEmailValidator);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
