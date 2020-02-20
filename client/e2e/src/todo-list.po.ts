import { browser, by, element, Key, ElementFinder } from 'protractor';

export class TodoPage {
  navigateTo() {
    return browser.get('/todos');
  }

  getUrl() {
    return browser.getCurrentUrl();
  }

  getTodoTitle() {
    return element(by.className('todos-list-title')).getText();
  }

  backspace() {
    browser.actions().sendKeys(Key.BACK_SPACE).perform();
  }
}