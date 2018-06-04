import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject, Observable } from 'rxjs';
import { TasksService } from 'src/app/shared/tasks.service';

@Injectable()
export class ListsService {

  lists: Map<number, string>;
  private updateSubject = new ReplaySubject<Map<number, string>>(1);
  get = this.updateSubject.asObservable();

  constructor(private http: HttpClient, private tasksService: TasksService) {
    this.lists = new Map();
    this.update();
  }

  update() {
    this.http.get('http://localhost:8000/list/').subscribe(
      (req: Array<any>) => {
        this.lists = new Map();
        req.forEach(
          item => {
            this.lists.set(item.id, item.name);
          }
        );
        this.tasksService.update();
        this.updateSubject.next(new Map(this.lists));
      }
    );
  }

  getLists() {
    return new Map(this.lists);
  }

  add(list: string) {
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
    this.http.put('http://localhost:8000/list/' + list.id + '/', list)
      .subscribe(
        item => this.update()
      );
  }
}

export class List {

  constructor(public name: string, public id?: number) {
  }
}
