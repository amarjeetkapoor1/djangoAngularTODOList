import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TasksService {

  tasks: Map<number, Array<Task>>;
  get = new Subject<Map<number, Array<Task>>>();

  constructor(private http: HttpClient) {
      this.tasks = new Map<number, Array<Task>>();
      this.update();
  }

  update() {
      this.http.get(`http://localhost:8000/task/`).subscribe(
          (req: Array<Task>) => {
              this.tasks = new Map<number, Array<Task>>();
              req.forEach(
                  item => {
                    if (this.tasks.has(item.list_id)) {
                      this.tasks.get(item.list_id).push(item);
                    } else {
                      this.tasks.set(item.list_id, new Array<Task>(item));
                    }
                  }
              );
              this.get.next(new Map(this.tasks));
          }
      );
  }

  getTasks(): Map<number, Array<Task>> {
      return new Map(this.tasks);
  }

  getTask(id: number): Array<Task> {
    if (this.tasks.has(id)) {
        return this.tasks.get(id).slice(0);
    }
    return new Array<Task>();
  }

/*   add(list: string) {
      this.http.post('http://localhost:8000/list/', {
          name: list
      }).subscribe(
          req => {
              this.update();
          }
      );
  }

  delete(id: number) {
      this.http.delete('http://localhost:8000/list/' + id + '/').subscribe(
          item => this.update()
      );
  }

  edit(list: List) {
      this.http.put('http://localhost:8000/list/' + list.id + '/', list).subscribe(
          item => this.update()
      );
  } */
}

export class Task {

    constructor(
      public id: number,
      public description: string,
      public priority: number,
      public title: string,
      public list_id: number
    ) {
    }

}
