import { Component, Input, OnInit} from '@angular/core';

/**
 * Displays value
 * 
 * @param value: string        the value of the display
 */

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  // Create the display part of the calculator.

  constructor() { }

  ngOnInit(): void {

    // Start display Value

    this.value = '0'
  }

  @Input() value: string;

}
