import { Component, OnInit, Input } from '@angular/core';
import { ListsService, List } from 'src/app/shared/lists.service';
import { TasksService, Task } from '../../shared/tasks.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  _id; string;
  tasks: Array<Task>;

  get id(): number {
    return this._id;
  }
  @Input() set id(val: number) {
    this._id = val;
    this.tasksService.getTask(this._id).subscribe(
      tasks => {
        this.tasks = tasks;
      }
    );
  }

  @Input() name: string;
  edit = false;

  constructor(private listsService: ListsService,
    private tasksService: TasksService) {
      this.tasks = new Array<Task>();
    }

  ngOnInit() {

  }

  onDelete() {
    this.listsService.delete(this.id);
  }

  onEdit() {
    this.listsService.edit(new List(this.name, this.id));
    this.edit = false;
  }
}
