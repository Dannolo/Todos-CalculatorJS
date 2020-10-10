import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

/**
 * todo container class. It contains a description of the todo
 * @param description: string      what you need to do 
 * 
 * ng on changes checks if description reaches 0 size aka there is nothing written in it
 */

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
}) 


export class TodoComponent implements OnChanges {

  constructor() { }

  @Input() description

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngDoCheck() {
    if(this.description.length === 0 ){
      this.description = ' This value should not be empty'
    }
  }

}
