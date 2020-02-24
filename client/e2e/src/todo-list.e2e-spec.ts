import { browser, protractor, by, element } from 'protractor';
import { TodoPage } from './todo-list.po';

describe('Todo list', () => {
  let page: TodoPage;

  beforeEach(() => {
    page = new TodoPage();
    page.navigateTo();
  });

  it('Should have the correct title', () => {
    expect(page.getTodoTitle()).toEqual('Todos');
  });

  it('Should type something in the owner filter and check that it returned correct elements', () => {
    page.typeInput('todo-owner-input', 'Blanche');
    expect(page.getTodoTableRows().count()).toBeGreaterThan(0);
    page.getTodoOwnerCells().each(e => {
      expect(e.getText()).toEqual('Blanche');
    });
  });

  it('Should type something in the category filter and check that it returned correct elements', () => {
    page.typeInput('todo-category-input', 'homework');
    expect(page.getTodoTableRows().count()).toBeGreaterThan(0);
    page.getTodoCategoryCells().each(e => {
      expect(e.getText()).toEqual('homework');
    });
  });

  it('Should type something in the body filter and check that it returned correct elements', () => {
    const longBodyText = 'Laborum incididunt nisi eiusmod aliqua velit quis occaecat excepteur ut in ad.'
      + ' Commodo adipisicing sint ipsum irure amet exercitation voluptate mollit.'
    page.typeInput('todo-body-input', longBodyText);
    expect(page.getTodoTableRows().count()).toBeGreaterThan(0);
    page.getTodoBodyCells().each(e => {
      expect(e.getText()).toEqual(longBodyText);
    });
  });

  it('Should type something partial in the owner filter and check that it returned correct elements', () => {
    page.typeInput('todo-owner-input', 'ry');
    expect(page.getTodoTableRows().count()).toBeGreaterThan(0);
    page.getTodoOwnerCells().each(e => {
      expect(e.getText()).toMatch(/ry/i);
    });
  });

  it('Should type something partial in the category filter and check that it returned correct elements', () => {
    page.typeInput('todo-category-input', 'de');
    expect(page.getTodoTableRows().count()).toBeGreaterThan(0);
    page.getTodoCategoryCells().each(e => {
      expect(e.getText()).toMatch(/de/i);
    });
  });

  it('Should type something partial in the body filter and check that it returned correct elements', () => {
    page.typeInput('todo-body-input', 'Lorem');
    expect(page.getTodoTableRows().count()).toBeGreaterThan(0);
    page.getTodoBodyCells().each(e => {
      expect(e.getText()).toMatch(/Lorem/i);
    });
  });

  it('Should return the correct elements for multiple filters', () => {
    page.typeInput('todo-body-input', 'Lorem');
    page.typeInput('todo-owner-input', 'Workman');
    expect(page.getTodoTableRows().count()).toBeGreaterThan(0);
    page.getTodoBodyCells().each(e => {
      expect(e.getText()).toMatch(/Lorem/i);
    });
    page.getTodoOwnerCells().each(e => {
      expect(e.getText()).toMatch(/Workman/i);
    });
  });
});
