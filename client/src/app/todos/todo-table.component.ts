import { Component, OnInit, Input } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Todo } from './todo';


@Component({
  selector: 'app-todo-table',
  templateUrl: 'todo-table.component.html',
  styleUrls: ['./todo-table.component.scss'],
  providers: []
})

export class TodoTableComponent implements OnInit {

  sortedData: Todo[];
  constructor() {
    this.sortedData = this.todos.slice();
  }
  columnsToDisplay = [ 'owner', 'category', 'status', 'body' ];

  @Input() todos: Todo[];


  ngOnInit(): void {}

  sortData(sort: Sort) {
    const data = this.todos.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortData = data.sort((a, b) => {
    const isAsc = sort.direction === 'asc';
    switch (sortData.active) {
      case 'owner' : return compare(a.owner, b.owner, isAsc);
      case 'category' : return compare(a.category, b.category, isAsc);
      // not working for boolean comparison yet.
      // case 'status' : return compare(a.status, b.status, isAsc);
      case 'body' : return compare(a.body, b.body, isAsc);
      default: return 0;
    }
   });
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
