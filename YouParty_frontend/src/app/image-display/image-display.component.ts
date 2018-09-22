import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-display',
  templateUrl: './image-display.component.html',
  styleUrls: ['./image-display.component.css']
})
export class ImageDisplayComponent implements OnInit {

  imgPath = 'assets/echo.png';

  constructor() { }

  ngOnInit() {
  }

  loadImage(src: string, onLoad: any) {
    const downloadingImage = new Image();
    downloadingImage.onload = onLoad;
    downloadingImage.src = src;
  }

  onImageRecieved(data: string) {
    // start loading
    this.loadImage(`data:image/png;base64,${data}`, () => {
      this.imgPath = `data:image/png;base64,${data}`;
      // end loading
    });
  }

}
