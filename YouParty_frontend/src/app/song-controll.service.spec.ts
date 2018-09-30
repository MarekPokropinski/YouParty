import { TestBed } from '@angular/core/testing';

import { SongControllService } from './song-controll.service';

describe('SongControllService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SongControllService = TestBed.get(SongControllService);
    expect(service).toBeTruthy();
  });
});
