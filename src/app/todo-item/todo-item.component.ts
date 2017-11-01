import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges, Inject} from '@angular/core';
import {ListID, ItemJSON, TodoListService} from "../todo-list.service";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

import {
  MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatDialog,
  MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatExpansionModule
} from '@angular/material';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent implements OnInit, OnChanges, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule,
  MatInputModule, MatOptionModule, BrowserAnimationsModule, NoopAnimationsModule, MatExpansionModule {
  @Input() item: ItemJSON;
  @Input() listId: ListID;
  @Input() clock: number;
  private editingLabel = false;
  private derouleCategories = false;

  constructor(private todoListService: TodoListService, public dialog: MatDialog) {
  }

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

  updateDateItem(value: number) {
    this.item.data["itemDate"] = value;
    this.todoListService.SERVER_UPDATE_ITEM_DATA(this.listId, this.item.id, this.item.data);
  }

  updateCategorieItem(value: number) {
    this.item.data["itemCategorie"] = value;
    this.todoListService.SERVER_UPDATE_ITEM_DATA(this.listId, this.item.id, this.item.data);
  }

  openModif(): void {
    const dialogRef = this.dialog.open(DialogModif, <MatDialogConfig>{
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`); // Pizza!
    });

    dialogRef.close('Pizza!');
  }
}

export class DialogModif {

  constructor(
    public dialogRef: MatDialogRef<DialogModif>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
