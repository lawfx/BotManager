import { TestBed } from '@angular/core/testing';

import { JanuszService } from './janusz.service';

describe('JanuszService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JanuszService = TestBed.get(JanuszService);
    expect(service).toBeTruthy();
  });
});
