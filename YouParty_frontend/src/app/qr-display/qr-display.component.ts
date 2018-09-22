import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qr-display',
  templateUrl: './qr-display.component.html',
  styleUrls: ['./qr-display.component.css']
})
export class QrDisplayComponent implements OnInit {

  svgPath = 'assets/qrcode.svg';

  constructor() { }

  ngOnInit() {
  }

}
