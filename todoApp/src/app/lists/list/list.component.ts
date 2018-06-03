import { Component, OnInit, Input } from '@angular/core';
import { ListsService, List } from 'src/app/shared/lists.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() id: number;
  @Input() name: string;
  edit = false;

  constructor(private listsService: ListsService) { }

  ngOnInit() {
  }

  onDelete() {
    this.listsService.delete(this.id);
  }

  onEdit() {
    this.listsService.edit(new List(this.id, this.name));
    this.edit = false;
  }
}
