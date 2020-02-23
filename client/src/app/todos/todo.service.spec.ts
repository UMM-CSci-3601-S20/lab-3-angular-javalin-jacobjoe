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
      todoService.getTodos().subscribe(
        todos => expect(todos).toBe(testTodos)
      );
      const req = httpTestingController.expectOne(todoService.todoUrl);
      expect(req.request.method).toEqual('GET');
      req.flush(testTodos);
    });

    it('calls api/users with filter parameter "category"', () => {
      todoService.getTodos({ category: 'chores' }).subscribe(
        todos => expect(todos).toBe(testTodos)
      );
      const req = httpTestingController.expectOne(
        request => request.url.startsWith(todoService.todoUrl) && request.params.has('category')
      );

      expect(req.request.method).toEqual('GET');
      expect(req.request.params.get('category')).toEqual('chores');

      req.flush(testTodos);
    });

    it('calls api/users with filter parameter "body"', () => {
      todoService.getTodos({ body: 'this is a substring of the body text' }).subscribe(
        todos => expect(todos).toBe(testTodos)
      );
      const req = httpTestingController.expectOne(
        request => request.url.startsWith(todoService.todoUrl) && request.params.has('body')
      );

      expect(req.request.method).toEqual('GET');
      expect(req.request.params.get('body')).toEqual('this is a substring of the body text');

      req.flush(testTodos);
    });

    it('calls api/users with filter parameter "owner"', () => {
      todoService.getTodos({ owner: 'Blanche' }).subscribe(
        todos => expect(todos).toBe(testTodos)
      );
      const req = httpTestingController.expectOne(
        request => request.url.startsWith(todoService.todoUrl) && request.params.has('owner')
      );

      expect(req.request.method).toEqual('GET');
      expect(req.request.params.get('owner')).toEqual('Blanche');

      req.flush(testTodos);
    });

    it('calls api/users with filter parameter "status"', () => {
      todoService.getTodos({ status: 'complete' }).subscribe(
        todos => expect(todos).toBe(testTodos)
      );
      const req = httpTestingController.expectOne(
        request => request.url.startsWith(todoService.todoUrl) && request.params.has('status')
      );

      expect(req.request.method).toEqual('GET');
      expect(req.request.params.get('status')).toEqual('complete');

      req.flush(testTodos);
    });

    it('calls api/users with multiple filter parameters', () => {
      todoService.getTodos({ category: 'chores', status: 'complete', owner: 'George III' }).subscribe(
        todos => expect(todos).toBe(testTodos)
      );
      const req = httpTestingController.expectOne(
        request => request.url.startsWith(todoService.todoUrl) && request.params.has('category') &&
          request.params.has('owner') && request.params.has('status')
      );

      expect(req.request.method).toEqual('GET');
      expect(req.request.params.get('category')).toEqual('chores');
      expect(req.request.params.get('owner')).toEqual('George III');
      expect(req.request.params.get('status')).toEqual('complete');

      req.flush(testTodos);
    });

    it('ignores parameters whose values are undefined', () => {
      todoService.getTodos({ category: 'chores', status: undefined, owner: undefined }).subscribe(
        todos => expect(todos).toBe(testTodos)
      );
      const req = httpTestingController.expectOne(
        request => request.url.startsWith(todoService.todoUrl)
          && request.params.has('category')
          && !request.params.has('owner')
          && !request.params.has('status')
      );

      expect(req.request.method).toEqual('GET');
      expect(req.request.params.get('category')).toEqual('chores');

      req.flush(testTodos);
    });
  });

  describe('filterTodos: ', () => {
    it('filters by owner', () => {
      expect(testTodos.length).toBe(4);
      const filteredTodos = todoService.filterTodos(testTodos, { owner: 'Billy' });
      expect(filteredTodos.length).toBe(2);
    });

    it('filters by nonexistent owner', () => {
      expect(testTodos.length).toBe(4);
      const filteredTodos = todoService.filterTodos(testTodos, { owner: 'Aunt Matilda' });
      expect(filteredTodos.length).toBe(0);
    });

    it('filters by body', () => {
      expect(testTodos.length).toBe(4);
      const filteredTodos = todoService.filterTodos(testTodos, { body: 'Mr. Scruffles' });
      expect(filteredTodos.length).toBe(2);
    });

    it('filters by nonexistent body', () => {
      expect(testTodos.length).toBe(4);
      const filteredTodos = todoService.filterTodos(testTodos, { body: 'martian invasion' });
      expect(filteredTodos.length).toBe(0);
    });

    it('filters by category', () => {
      expect(testTodos.length).toBe(4);
      const filteredTodos = todoService.filterTodos(testTodos, { category: 'not being such a lazy-bones' });
      expect(filteredTodos.length).toBe(1);
    });


    it('filters by nonexistent category', () => {
      expect(testTodos.length).toBe(4);
      const filteredTodos = todoService.filterTodos(testTodos, { category: 'Johnny Cash songs' });
      expect(filteredTodos.length).toBe(0);
    });

    it('is case-insensitive', () => {
      expect(testTodos.length).toBe(4);
      const filteredTodos = todoService.filterTodos(testTodos, { owner: 'BiLlY' });
      expect(filteredTodos.length).toBe(2);
    });

    it('works with combinations of parameters', () => {
      expect(testTodos.length).toBe(4);
      const filteredTodos = todoService.filterTodos(testTodos, { body: 'Mr. Scruffles', category: 'Chores' });
      expect(filteredTodos.length).toBe(1);
    });

    it('ignores parameters whose values are undefined', () => {
      expect(testTodos.length).toBe(4);
      const filteredTodos = todoService.filterTodos(testTodos, { body: undefined, category: 'Chores' });
      expect(filteredTodos.length).toBe(3);
    });
  });
});
