import { TestBed } from '@angular/core/testing';

import { ShowprofileResolver } from './showprofile.resolver';

describe('ShowprofileResolver', () => {
  let resolver: ShowprofileResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ShowprofileResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
