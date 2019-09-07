import { TestBed } from '@angular/core/testing';

import { BotInfoService } from './bot-info.service';

describe('BotInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BotInfoService = TestBed.get(BotInfoService);
    expect(service).toBeTruthy();
  });
});
