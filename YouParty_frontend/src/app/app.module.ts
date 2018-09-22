import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { YoutubePlayerModule } from 'ngx-youtube-player';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SongListComponent } from './song-list/song-list.component';
import { SongControllerComponent } from './song-controller/song-controller.component';
import { QrDisplayComponent } from './qr-display/qr-display.component';
import { ImageDisplayComponent } from './image-display/image-display.component';

import { StompConfig, StompService } from '@stomp/ng2-stompjs';


const stompConfig: StompConfig = {
  url: 'ws://localhost:8080/queueWS',
  headers: {
    login: 'guest',
    passcode: 'guest'
  },
  heartbeat_in: 0,
  heartbeat_out: 20000,
  reconnect_delay: 5000,
  debug: true
};

@NgModule({
  declarations: [
    AppComponent,
    SongListComponent,
    SongControllerComponent,
    QrDisplayComponent,
    ImageDisplayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    YoutubePlayerModule,
    HttpClientModule
  ],
  providers: [
    StompService,
    {
      provide: StompConfig,
      useValue: stompConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
