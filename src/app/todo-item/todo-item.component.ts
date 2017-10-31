import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ListID, ItemJSON, TodoListService} from "../todo-list.service";

import {
  MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatInputModule,
  MatDatepickerInput
} from '@angular/material';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent implements OnInit, OnChanges, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatInputModule {
  @Input() item: ItemJSON;
  @Input() listId: ListID;
  @Input() clock: number;
  private editingLabel = false;
  private derouleCategories = false;

  constructor(private todoListService: TodoListService) { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
  }

  setLabel(label: string) {
    if (label === "") {
      this.delete();
    } else {
      this.todoListService.SERVER_UPDATE_ITEM_LABEL(this.listId, this.item.id, label);
    }
    this.editLabel(false);
  }

  isEditingLabel(): boolean {
    return this.editingLabel;
  }

  editLabel(edit: boolean) {
    this.editingLabel = edit;
    // this.updateItem();
  }

  check(checked: boolean) {
    this.todoListService.SERVER_UPDATE_ITEM_CHECK(this.listId, this.item.id, checked);
  }

  delete() {
    this.todoListService.SERVER_DELETE_ITEM(this.listId, this.item.id);
  }

  getDerouleCategories(): boolean {
    return this.derouleCategories;
  }

  createDeroule() {
    if (this.derouleCategories === false) {
      this.derouleCategories = true;
    } else {
      this.derouleCategories = false;
    }
  }

  updateItem(value: number) {
    console.log("value: " + value);
    console.log("date de base: " + this.item.data["itemDate"]);
    this.item.data["itemDate"] = value;
    console.log("date: " + this.item.data["itemDate"]);
    // this.todoListService.SERVER_UPDATE_ITEM_DATA(this.listId, this.item.id, Object.assign({}, this.item.data["itemDate"], {value}));
    this.todoListService.SERVER_UPDATE_ITEM_DATA(this.listId, this.item.id, this.item.data);
  }
}
