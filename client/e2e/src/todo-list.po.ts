import { browser, by, element, Key } from 'protractor';

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
}
