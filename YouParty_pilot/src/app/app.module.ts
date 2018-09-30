import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SongListComponent } from './song-list/song-list.component';

import { StompConfig, StompService } from '@stomp/ng2-stompjs';
import { SelectorComponent } from './selector/selector.component';

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
    SelectorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
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
