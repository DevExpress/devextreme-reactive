import * as React from 'react';
import { createMount, getClasses } from '@mui/material/test-utils';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { setupConsole } from '@devexpress/dx-testing';
import { Pagination } from './pagination';

describe('Pagination', () => {
  let resetConsole;
  let mount;
  let classes;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['SheetsRegistry'] });
    classes = getClasses(<Pagination
      totalPages={1}
      currentPage={0}
      totalCount={10}
      pageSize={10}
      getMessage={() => {}}
      onCurrentPageChange={() => {}}
    />);
  });
  beforeEach(() => {
    mount = createMount();
  });
  afterEach(() => {
    mount.cleanUp();
  });
  afterAll(() => {
    resetConsole();
  });

  describe('#render', () => {
    const mountPagination = ({
      totalPages,
      currentPage,
      totalCount,
      pageSize,
      getMessage = () => {},
      onCurrentPageChange = () => {},
    }) => mount((
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        totalCount={totalCount}
        pageSize={pageSize}
        getMessage={getMessage}
        onCurrentPageChange={onCurrentPageChange}
      />
    ));

    it('can select the first item', () => {
      const tree = mountPagination({
        totalPages: 10,
        currentPage: 0,
        totalCount: 10,
        pageSize: 5,
      });
      const activeButtonClass = classes.activeButton;
      const buttons = tree.find(Button);
      const activeItems = buttons.filterWhere(b => b.hasClass(activeButtonClass) === true);
      const disabledItems = buttons.filterWhere(b => b.props().disabled === true);

      expect(buttons).toHaveLength(5);
      expect(activeItems).toHaveLength(1);
      expect(activeItems.at(0).prop('tabIndex')).toBe(-1);
      expect(disabledItems).toHaveLength(1);

      expect(buttons.at(0).hasClass(classes.activeButton)).toBeTruthy();
      expect(buttons.at(3).props().disabled).toBeTruthy();
    });

    it('can select an item in the middle', () => {
      const tree = mountPagination({
        totalPages: 10,
        currentPage: 3,
        totalCount: 50,
        pageSize: 5,
      });
      const activeButtonClass = classes.activeButton;
      const buttons = tree.find(Button);
      const activeItems = buttons.filterWhere(b => b.hasClass(activeButtonClass) === true);
      const disabledItems = buttons.filterWhere(b => b.props().disabled === true);

      expect(buttons).toHaveLength(7);
      expect(activeItems).toHaveLength(1);
      expect(disabledItems).toHaveLength(2);

      expect(buttons.at(3).hasClass(activeButtonClass)).toBeTruthy();
      expect(buttons.at(1).props().disabled).toBeTruthy();
      expect(buttons.at(5).props().disabled).toBeTruthy();
    });

    it('can select the last item', () => {
      const tree = mountPagination({
        totalPages: 10,
        currentPage: 9,
        totalCount: 100,
        pageSize: 10,
      });
      const activeButtonClass = classes.activeButton;
      const buttons = tree.find(Button);
      const activeItems = buttons.filterWhere(b => b.hasClass(activeButtonClass) === true);
      const disabledItems = buttons.filterWhere(b => b.props().disabled === true);

      expect(buttons).toHaveLength(5);
      expect(activeItems).toHaveLength(1);
      expect(disabledItems).toHaveLength(1);

      expect(buttons.at(4).hasClass(activeButtonClass)).toBeTruthy();
      expect(buttons.at(1).props().disabled).toBeTruthy();
    });

    it('can show info about rendered pages', () => {
      const getMessage = jest.fn();
      getMessage.mockImplementation(key => key);

      const tree = mountPagination({
        totalPages: 10,
        currentPage: 1,
        totalCount: 96,
        pageSize: 10,
        getMessage,
      });

      expect(getMessage)
        .toBeCalledWith('info', { from: 11, to: 20, count: 96 });
      expect(tree.find('div > span').text())
        .toBe('info');
    });

    it('can render pagination arrows', () => {
      const onCurrentPageChange = jest.fn();
      const arrows = mountPagination({
        totalPages: 10,
        currentPage: 2,
        totalCount: 96,
        pageSize: 10,
        onCurrentPageChange,
      }).find(IconButton);

      const prev = arrows.at(0);
      const next = arrows.at(1);

      prev.simulate('click');
      next.simulate('click');

      expect(arrows).toHaveLength(2);
      expect(prev.props().disabled).toBeFalsy();
      expect(next.props().disabled).toBeFalsy();
      expect(onCurrentPageChange.mock.calls).toHaveLength(2);
    });

    it('displays the prev arrow if the first page is selected', () => {
      const onCurrentPageChange = jest.fn();
      const arrows = mountPagination({
        totalPages: 10,
        currentPage: 0,
        totalCount: 96,
        pageSize: 10,
        onCurrentPageChange,
      }).find(IconButton);

      const prev = arrows.at(0);
      const next = arrows.at(1);

      prev.simulate('click');
      next.simulate('click');

      expect(prev.props().disabled).toBeTruthy();
      expect(next.props().disabled).toBeFalsy();
      expect(onCurrentPageChange.mock.calls).toHaveLength(1);
    });

    it('displays the next arrow if the current page equals to total page count', () => {
      const onCurrentPageChange = jest.fn();
      const arrows = mountPagination({
        totalPages: 10,
        currentPage: 9,
        totalCount: 96,
        pageSize: 5,
        onCurrentPageChange,
      }).find(IconButton);

      const prev = arrows.at(0);
      const next = arrows.at(1);

      prev.simulate('click');
      next.simulate('click');

      expect(prev.props().disabled).toBeFalsy();
      expect(next.props().disabled).toBeTruthy();
      expect(onCurrentPageChange.mock.calls).toHaveLength(1);
    });

    it('should render aria-labels', () => {
      const arrows = mountPagination({
        totalPages: 10,
        currentPage: 9,
        totalCount: 96,
        pageSize: 5,
      }).find(IconButton);
      const prev = arrows.at(0);
      const next = arrows.at(1);

      expect(prev.prop('aria-label')).toBe('Previous');
      expect(next.prop('aria-label')).toBe('Next');
    });

    describe('ellipsis', () => {
      const ellipsisText = '\u2026';
      const pages = [1, 2, 3, 4, 5];
      const pageSize = 8;

      pages.forEach((currentPage) => {
        it(`should not render ellipsis if elements count equal total count (on ${currentPage} page)`, () => {
          const pagination = mountPagination({
            totalPages: pages.length,
            currentPage,
            totalCount: pageSize * pages.length,
            pageSize,
          });

          const buttons = pagination.find('PageButton');
          expect(buttons.length).toBe(pages.length);

          const ellipsis = buttons.findWhere(button => button.prop('text') === ellipsisText);
          expect(ellipsis.length).toBe(0);
        });
      });
    });
  });
});
