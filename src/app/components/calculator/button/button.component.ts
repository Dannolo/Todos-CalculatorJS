import { Component, Input, OnInit } from '@angular/core';

/** Simple button class.
 * 
 * @param name 
 */

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  constructor() { }

  @Input() name: string

  ngOnInit(): void {
  }

}
