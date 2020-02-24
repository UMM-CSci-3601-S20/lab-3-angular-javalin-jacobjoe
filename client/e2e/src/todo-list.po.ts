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
}
