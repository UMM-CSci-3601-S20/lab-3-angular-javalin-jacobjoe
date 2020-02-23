import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';
import { Todo } from './todo';


@Component({
  selector: 'app-todo-list-component',
  templateUrl: 'todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  providers: []
})

export class TodoListComponent implements OnInit {
  public serverFilteredUsers: Todo[];
  public filteredUsers: Todo[];

  constructor(private todoService: TodoService) {

  }

  // These fields are hooked up to the inputs in the html.
  // They should be live: they'll automatically reflect changes to the contents
  // of the page.
  // We'll use them to filter the list of todos (either )
  public todoOwner: string;
  public todoCategory: string;
  public todoBody: string;
  public todoStatus: string;

  ngOnInit(): void {}

  updateFilter(): void {
    // TODO
  }

  getTodosFromServer(): void {
    this.todoService.getTodos({
      status: this.todoStatus,
    }).subscribe(returnedUsers => {
      this.serverFilteredUsers = returnedUsers;
      this.updateFilter();
    }, err => {
      console.log(err);
    });
  }
}
