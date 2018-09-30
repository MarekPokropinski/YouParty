import { TestBed } from '@angular/core/testing';

import { SongQueueService } from './song-queue.service';

describe('SongQueueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SongQueueService = TestBed.get(SongQueueService);
    expect(service).toBeTruthy();
  });
});
