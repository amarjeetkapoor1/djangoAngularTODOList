import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable()
export class ListsService {

    lists: Map<number, string>;
    get = new Subject<Map<number, string>>();

    constructor(private http: HttpClient) {
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
                this.get.next(new Map(this.lists));
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
        this.http.put('http://localhost:8000/list/' + list.id + '/', list).subscribe(
            item => this.update()
        );
    }
}

export class List {

    constructor(public id: number, public name: string) {
    }

}
