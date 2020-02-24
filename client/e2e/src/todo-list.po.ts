import { browser, by, element, Key, ElementFinder } from 'protractor';

export class TodoPage {
  navigateTo() {
    return browser.get('/todos');
  }

  getUrl() {
    return browser.getCurrentUrl();
  }

  getTodoTitle() {
    return element(by.className('todo-list-title')).getText();
  }

  backspace() {
    browser.actions().sendKeys(Key.BACK_SPACE).perform();
  }

  typeInput(inputId: string, text: string) {
    const input = element(by.id(inputId));
    input.click();
    input.sendKeys(text);
  }

  getTodoTableRows() {
    return element(by.className('todo-table')).all(by.tagName('tr'));
  }

  getTodoOwnerCells() {
    return element.all(by.className('todo-owner-cell'));
  }

  getTodoCategoryCells() {
    return element.all(by.className('todo-category-cell'));
  }

  getTodoStatusCells() {
    return element.all(by.className('todo-status-cell'));
  }

  getTodoBodyCells() {
    return element.all(by.className('todo-body-cell'))
}
