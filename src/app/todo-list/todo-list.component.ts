import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {TodoListWithItems, TodoListService} from "../todo-list.service";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit {
  @Input() list: TodoListWithItems;
  @Input() clock: number;

  constructor(private todoListService: TodoListService) { }

  ngOnInit() {
  }

  createItem(label: string) {
    const id = this.todoListService.SERVER_CREATE_ITEM(this.list.id, label, false, {
      someData: "someValue",
      someNumber: 42,
      someArray: ["riri", "fifi", "loulou"],
      itemColor: "#FFFFFF",
      itemDate: Date.now(),
      itemCategorie: "Aucune"
      // Add other data here...
    });
  }

  delete() {
    this.todoListService.SERVER_DELETE_LIST(this.list.id);
  }

  getColor(): string {
    return this.list.data["color"] ? this.list.data["color"] : "#FFFFFF";
  }

  setColor(color: string) {
    console.log("setColor", color);
    this.todoListService.SERVER_UPDATE_LIST_DATA(
      this.list.id,
      Object.assign({}, this.list.data, {color})
    );
  }

  nbunchecked(): number {
    let nbunchecked = 0;
      for ( let b = 0 ; b < this.list.items.length; b++) {
        if ( this.list.items[b].checked === false) {
          nbunchecked++;
        }
      }
    return nbunchecked;
  }

  nbItems(): number {
    let nbItems = 0;
    for ( let b = 0 ; b < this.list.items.length; b++) {
        nbItems++;
    }
    return nbItems;
  }

  checkAll(checked: boolean) {
    for (const item of this.list.items) {
        this.todoListService.SERVER_UPDATE_ITEM_CHECK(this.list.id, item.id, checked);
    }
  }
}
