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
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { MainScreenComponent } from './main-screen/main-screen.component';


const stompConfig: StompConfig = {
  url: environment.wsUrl + '/queueWS',
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
    ImageDisplayComponent,
    MainScreenComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    YoutubePlayerModule,
    HttpClientModule,
    AppRoutingModule
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
