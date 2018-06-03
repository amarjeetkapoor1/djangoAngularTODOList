import { Component, OnInit } from '@angular/core';
import { ListsService, List } from 'src/app/shared/lists.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  lists: Map<number, string>;
  add = false;
  newList: string;

  constructor(private listsService: ListsService) {
    this.lists = this.listsService.getLists();
    this.listsService.get.subscribe(
      item => {
        this.lists = item;
        console.log(this.lists);
      }
    );
  }

  ngOnInit() {
  }

  getKeys() {
    const keys = new Array();
    this.lists.forEach (
      (item, key)  => {
        keys.push(key);
      }
    );
    return keys;
  }

  onRefresh() {
    this.listsService.update();
  }

  onAdd() {
    this.listsService.add(this.newList);
    this.add = false;
  }
}
