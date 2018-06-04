import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/shared/tasks.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() task: Task;
  constructor() { }

  ngOnInit() {
  }

  getColor() {
    switch (this.task.priority) {
      case 1:
        return {'background-color': '#666699'};
      case 2:
        return {'background-color': '#6699ff'};
      case 3:
        return {'background-color': '#ff99ff'};
      case 4:
        return {'background-color': '#ccffcc'};
      case 5:
        return {'background-color': '#66ff66'};
      case 6:
        return {'background-color': '#669900'};
      case 7:
        return {'background-color': '#ff9900'};
      case 8:
        return {'background-color': '#ff3300'};
      case 9:
        return {'background-color': '#ff6666'};
      default:
        return {'background-color': '#cc0000'};
    }
  }
}
