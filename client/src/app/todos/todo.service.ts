import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Todo } from './todo';
import { fileURLToPath } from 'url';

@Injectable()
export class TodoService {
  readonly todoUrl: string = environment.API_URL + 'todos';

  constructor(private httpClient: HttpClient) {
  }

  getTodos(filters?: {
      category?: string,
      status?: string,
      body?: string,
      owner?: string }): Observable<Todo[]> {
    let httpParams: HttpParams = new HttpParams();
    for (const fieldName in filters) {
      if (filters.hasOwnProperty(fieldName)) {
        httpParams = httpParams.set(fieldName, filters[fieldName]);
      }
    }
    return this.httpClient.get<Todo[]>(this.todoUrl, {
      params: httpParams,
    });
  }

  filterTodos(todos: Todo[], filters: {
      owner?: string,
      body?: string,
      category?: string }): Todo[] {
    let filteredTodos = todos;
    for (const fieldName in filters) {
      if (filters.hasOwnProperty(fieldName)) {
        filteredTodos = filteredTodos.filter(todo =>
          todo[fieldName].toLowerCase().indexOf(filters[fieldName]) !== -1);
      }
    }
    return filteredTodos;
  }
}
