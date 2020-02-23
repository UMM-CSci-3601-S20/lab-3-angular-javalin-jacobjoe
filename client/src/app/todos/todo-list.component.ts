import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-todo-list-component',
  templateUrl: 'todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  providers: []
})

export class TodoListComponent implements OnInit {
  public todoOwner: string;
  public todoCategory: string;
  public todoBody: string;
  public todoStatus: string;

  ngOnInit(): void {}

  updateFilter(): void {
    // TODO
  }

  getTodosFromServer(): void {
    // TODO
  }
}
