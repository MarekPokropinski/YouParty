import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SongListComponent } from './song-list/song-list.component';
import { SongControllerComponent } from './song-controller/song-controller.component';
import { QrDisplayComponent } from './qr-display/qr-display.component';
import { ImageDisplayComponent } from './image-display/image-display.component';

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
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
