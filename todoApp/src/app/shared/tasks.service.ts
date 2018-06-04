import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  tasks: Map<number, Array<Task>>;
  private updateSubject = new ReplaySubject<Map<number, Array<Task>>>(1);
  get = this.updateSubject.asObservable();

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
        this.updateSubject.next(new Map(this.tasks));
      }
    );
  }

  getTask(id: number) {
    return this.get.pipe(
        filter( item => item.has(id))
      ).pipe(
        map<Map<number, Array<Task>>, Array<Task>>(
          item => item.get(id)
        )
      );
  }

  add(task: Task) {
    this.http.post('http://localhost:8000/task/', task).subscribe(
      req => {
        this.update();
      }
    );
  }

  delete(id: number) {
    this.http.delete('http://localhost:8000/task/' + id + '/').subscribe(
        item => this.update()
    );
  }

  edit(task: Task) {
    this.http.put('http://localhost:8000/task/' + task.id + '/', task)
      .subscribe(
        item => this.update()
      );
  }
}

export class Task {

  constructor(
    public description: string,
    public priority: number,
    public title: string,
    public list_id: number,
    public id?: number
  ) {}

}
