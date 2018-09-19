import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongControllerComponent } from './song-controller.component';

describe('SongControllerComponent', () => {
  let component: SongControllerComponent;
  let fixture: ComponentFixture<SongControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
