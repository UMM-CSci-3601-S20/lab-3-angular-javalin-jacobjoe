import { browser, protractor, by, element, ElementArrayFinder, ElementFinder } from 'protractor';
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

  it('Displays all todos', () => {
    expect(page.getTodoTableRows().count()).toEqual(300);
  });


  describe('Using the filters: ', () => {
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

    describe('The status selecter: ', () => {
      it('Should select a status check that it returned correct elements', () => {
        page.selectMatSelectValue('todo-status-select', 'complete');
        expect(page.getTodoTableRows().count()).toBeGreaterThan(0);
        page.getTodoStatusCells().each(e => {
          expect(e.getText()).toMatch('Complete');
        });
      });

      it('Should make sure that status works with the other fields', () => {
        page.selectMatSelectValue('todo-status-select', 'complete');
        page.typeInput('todo-body-input', 'Lorem');
        page.typeInput('todo-owner-input', 'Workman');
        expect(page.getTodoTableRows().count()).toBeGreaterThan(0);
        page.getTodoStatusCells().each(e => {
          expect(e.getText()).toMatch('Complete');
        });
        page.getTodoBodyCells().each(e => {
          expect(e.getText()).toMatch(/Lorem/i);
        });
        page.getTodoOwnerCells().each(e => {
          expect(e.getText()).toMatch(/Workman/i);
        });
      });
    });
  });

  describe('The limit selecter: ', () => {
    it('limits the number of todos displayed', () => {
      page.selectMatSelectValue('limit-select', '20');
      expect(page.getTodoTableRows().count()).toBeGreaterThan(0);
      expect(page.getTodoTableRows().count()).toBeLessThanOrEqual(20);
    });

    it('can be changed back to its old value', () => {
      page.selectMatSelectValue('limit-select', '500');
      page.selectMatSelectValue('limit-select', '10');
      page.selectMatSelectValue('limit-select', '500');
      expect(page.getTodoTableRows().count()).toBeGreaterThan(10);
      expect(page.getTodoTableRows().count()).toBeLessThanOrEqual(500);
    });

    it('interacts well with client-side filtering', () => {
      page.typeInput('todo-body-input', 'Lorem');
      page.selectMatSelectValue('limit-select', '20');
      page.typeInput('todo-owner-input', 'Workman');
      expect(page.getTodoTableRows().count()).toBeGreaterThan(0);
      expect(page.getTodoTableRows().count()).toBeLessThanOrEqual(20);
    });

    it('interacts well with server-side filtering', () => {
      page.selectMatSelectValue('todo-status-select', 'complete');
      page.selectMatSelectValue('limit-select', '20');
      page.selectMatSelectValue('todo-status-select', 'complete');
      expect(page.getTodoTableRows().count()).toBeGreaterThan(0);
      expect(page.getTodoTableRows().count()).toBeLessThanOrEqual(20);
    });

    it('works okay with everything all together', () => {
      page.selectMatSelectValue('todo-status-select', 'complete');
      page.selectMatSelectValue('limit-select', '20');
      page.selectMatSelectValue('todo-status-select', 'incomplete');
      page.selectMatSelectValue('limit-select', '500');
      page.selectMatSelectValue('limit-select', '100');
      expect(page.getTodoTableRows().count()).toBeGreaterThan(0);
      expect(page.getTodoTableRows().count()).toBeLessThanOrEqual(100);
    });
  });

  describe('The sortable table header: ', () => {
    it('sorts ascending by owner', () => {
      // This test takes too long if we don't limit the number of todos.
      page.selectMatSelectValue('limit-select', '20');
      page.clickHeaderCell('todo-owner-header');
      expect(isSortedAscending(page.getTodoOwnerCells(), cell => cell.getText(), 20)).toBeTruthy();
    });

    it('sorts descending by owner', () => {
      page.selectMatSelectValue('limit-select', '20');
      page.clickHeaderCell('todo-owner-header');
      page.clickHeaderCell('todo-owner-header');
      expect(isSortedDescending(page.getTodoOwnerCells(), cell => cell.getText(), 20)).toBeTruthy();
    });

    it('sorts ascending by category', () => {
      page.selectMatSelectValue('limit-select', '20');
      page.clickHeaderCell('todo-category-header');
      expect(isSortedAscending(page.getTodoCategoryCells(), cell => cell.getText(), 20)).toBeTruthy();
    });

    it('sorts descending by category', () => {
      page.selectMatSelectValue('limit-select', '20');
      page.clickHeaderCell('todo-category-header');
      page.clickHeaderCell('todo-category-header');
      expect(isSortedDescending(page.getTodoCategoryCells(), cell => cell.getText(), 20)).toBeTruthy();
    });

    it('sorts ascending by status', () => {
      page.selectMatSelectValue('limit-select', '20');
      page.clickHeaderCell('todo-status-header');
      expect(
        isSortedAscending(
          page.getTodoStatusCells(),
          cell => cell.getText().then(text => text === 'Complete'),
          20,
        )
      ).toBeTruthy();
    });

    it('sorts descending by status', () => {
      page.selectMatSelectValue('limit-select', '20');
      page.clickHeaderCell('todo-status-header');
      page.clickHeaderCell('todo-status-header');
      expect(
        isSortedDescending(
          page.getTodoStatusCells(),
          cell => cell.getText().then(text => text === 'Complete'),
          20,
        )
      ).toBeTruthy();
    });

    it('sorts ascending by body', () => {
      page.selectMatSelectValue('limit-select', '20');
      page.clickHeaderCell('todo-body-header');
      expect(isSortedAscending(page.getTodoBodyCells(), cell => cell.getText().then(text => text === 'Complete'), 20)).toBeTruthy();
    });

    it('sorts descending by body', () => {
      page.selectMatSelectValue('limit-select', '20');
      page.clickHeaderCell('todo-body-header');
      page.clickHeaderCell('todo-body-header');
      expect(isSortedDescending(page.getTodoBodyCells(), cell => cell.getText(), 20)).toBeTruthy();
    });
  });
});

function isSortedAscending(
    elementArrayFinder: ElementArrayFinder,
    keyToSortBy: (elementFinder: ElementFinder) => any,
    lengthOfElementArrayFinder: number): boolean {
  for (let i = 0; i < lengthOfElementArrayFinder - 1; i++) {
    const previousElement = elementArrayFinder.get(i);
    const nextElement = elementArrayFinder.get(i + 1);

    if (keyToSortBy(previousElement) > keyToSortBy(nextElement)) {
      return false;
    }
  }
  return true;
}

function isSortedDescending(
    elementArrayFinder: ElementArrayFinder,
    keyToSortBy: (elementFinder: ElementFinder) => any,
    lengthOfElementArrayFinder: number): boolean {
  for (let i = 0; i < lengthOfElementArrayFinder - 1; i++) {
    const previousElement = elementArrayFinder.get(i);
    const nextElement = elementArrayFinder.get(i + 1);

    if (keyToSortBy(previousElement) > keyToSortBy(nextElement)) {
      return false;
    }
  }
  return true;
}
