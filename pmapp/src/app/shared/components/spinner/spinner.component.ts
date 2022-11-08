import { Component, Input } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
  constructor() {}
  @Input() value: number = 50;
  @Input() diameter: number = 100;
  @Input() mode: ProgressSpinnerMode = 'determinate';
  @Input() strokeWidth: number = 10;
}
