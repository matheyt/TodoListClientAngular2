import { Component, OnInit } from '@angular/core';
import {TodoListWithItems, TodoListJSON, TodoListService, ItemJSON} from "../todo-list.service";
import {List} from "immutable";
import {DndModule} from 'ng2-dnd';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit, DndModule {
  lists = List<TodoListJSON>();

  constructor(private todoListService: TodoListService) { }

  ngOnInit() {
  }

  getLists(): TodoListWithItems[] {
    return this.todoListService.getLists();
  }

  createList(name: string) {
    const localListID = this.todoListService.SERVER_CREATE_NEW_LIST(name, {
      color: "#FF0000",
      someOtherAttribute: "pourquoi pas un texte ?"
      // Add other data here...
    });
  }

}
