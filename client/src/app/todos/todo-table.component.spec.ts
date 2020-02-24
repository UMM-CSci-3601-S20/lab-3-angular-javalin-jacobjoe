import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTableModule } from '@angular/material/table';
import { TodoTableComponent } from './todo-table.component';
import { testTodos } from 'src/testing/test-todos';

describe('TodoTableComponent', () => {
  let component: TodoTableComponent;
  let fixture: ComponentFixture<TodoTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatTableModule,
      ],
      declarations: [ TodoTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoTableComponent);
    component = fixture.componentInstance;
    component.todos = testTodos;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display at least two columns', () => {
    expect(component.columnsToDisplay.length).toBeGreaterThanOrEqual(2);
  });
});
