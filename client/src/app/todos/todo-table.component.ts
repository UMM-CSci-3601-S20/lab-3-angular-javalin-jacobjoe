import { Component, OnInit, Input } from '@angular/core';
import { Todo } from './todo';


@Component({
  selector: 'app-todo-table',
  templateUrl: 'todo-table.component.html',
  styleUrls: ['./todo-table.component.scss'],
  providers: []
})

export class TodoTableComponent implements OnInit {
  columnsToDisplay = [ 'owner', 'category', 'status', 'body' ];

  @Input() todos: Todo[];

  ngOnInit(): void {}
}