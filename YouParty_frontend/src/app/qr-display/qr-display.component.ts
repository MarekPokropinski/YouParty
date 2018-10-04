import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-qr-display',
  templateUrl: './qr-display.component.html',
  styleUrls: ['./qr-display.component.css']
})
export class QrDisplayComponent implements OnInit {

  @Input() qrPath: string;

  constructor() { }

  ngOnInit() {
  }
}
