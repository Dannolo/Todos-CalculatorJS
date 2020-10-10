import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';

/**
 * dashboard of our todo list, contains all the todo in an array called dashboard. Todos are added, removed and modified using normal array functions and Angular directives
 * @param dashboard: string[]       contains all todos
 * 
 * All functions do simple actions, easy to understand just looking at them.
 */

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  ngOnInit(): void {
    this.dashboard = []
  }

  dashboard: string[]

  add_todo(note): void {
    var message = note.value
    if (message === null || message === '') {
      message = "take a seat and write what you need"
    }
    this.dashboard.push(message)
    note.value = null
  }

  remove_todo(todo: string): void {
    var index = this.dashboard.indexOf(todo)
    this.dashboard.splice(index, 1)
  }

  removeAll_todo(): void {
    this.dashboard = []
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.dashboard, event.previousIndex, event.currentIndex);
  }

}
