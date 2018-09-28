import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css']
})
export class SelectorComponent implements OnInit {

  inputValue = '';

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  handleSubmit(): void {
    this.router.navigateByUrl(`/lobby/${this.inputValue}`);
  }
}
