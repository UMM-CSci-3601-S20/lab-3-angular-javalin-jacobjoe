import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Todo } from './todo';
import { TodoService } from './todo.service';
import { testTodos } from '../../testing/test-todos';

describe('Todo service: ', () => {
  let todoService: TodoService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    // Set up the mock handling of the HTTP requests
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    // Construct an instance of the service with the mock
    // HTTP client.
    todoService = new TodoService(httpClient);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  describe('getTodos: ',  () => {
    it('calls api/todos', () => {
      // TODO
      todoService.getTodos().subscribe(
        todos => expect(todos).toBe(testTodos)
      );
      const req = httpTestingController.expectOne(todoService.todoUrl);
      expect(req.request.method).toEqual('GET');
      req.flush(testTodos);
    });

    it('calls api/users with filter parameter "category"', () => {
      todoService.getTodos({ category: 'chores'}).subscribe(
        todos => expect(todos).toBe(testTodos)
      );
      const req = httpTestingController.expectOne(
        request => request.url.startsWith(todoService.todoUrl) && request.params.has('category')
      );

      expect(req.request.method).toEqual('GET');
      expect(req.request.params.get('category')).toEqual('chores');

      req.flush(testTodos);
    });
  });

});
