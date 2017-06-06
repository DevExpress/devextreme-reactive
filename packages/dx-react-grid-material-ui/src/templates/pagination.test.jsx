import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { mountWithStyles, triggerTouchTap } from '../utils/testing';
import { Pagination, paginationStyleSheet } from './pagination';

injectTapEventPlugin();

describe('Pagination', () => {
  describe('#render', () => {
    const mountPagination = ({
      totalPages,
      currentPage,
      totalCount,
      firstRowIndex,
      lastRowIndex,
      onCurrentPageChange = () => {},
    }) => mountWithStyles(
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        totalCount={totalCount}
        firstRowIndex={firstRowIndex}
        lastRowIndex={lastRowIndex}
        onCurrentPageChange={onCurrentPageChange}
      />,
      paginationStyleSheet,
    );

    test('can select the first item', () => {
      const pagination = mountPagination({
        totalPages: 10,
        currentPage: 1,
        totalCount: 10,
        firstRowIndex: 1,
        lastRowIndex: 5,
      });
      const activeButtonClass = pagination.classes.activeButton;
      const buttons = pagination.tree.find('Button');
      const activeItems = buttons.filterWhere(b => b.hasClass(activeButtonClass) === true);
      const disabledItems = buttons.filterWhere(b => b.props().disabled === true);

      expect(buttons).toHaveLength(5);
      expect(activeItems).toHaveLength(1);
      expect(disabledItems).toHaveLength(1);

      expect(buttons.at(0).hasClass(pagination.classes.activeButton)).toBeTruthy();
      expect(buttons.at(3).props().disabled).toBeTruthy();
    });

    test('can select an item in the middle', () => {
      const pagination = mountPagination({
        totalPages: 10,
        currentPage: 4,
        totalCount: 50,
        firstRowIndex: 41,
        lastRowIndex: 45,
      });
      const activeButtonClass = pagination.classes.activeButton;
      const buttons = pagination.tree.find('Button');
      const activeItems = buttons.filterWhere(b => b.hasClass(activeButtonClass) === true);
      const disabledItems = buttons.filterWhere(b => b.props().disabled === true);

      expect(buttons).toHaveLength(7);
      expect(activeItems).toHaveLength(1);
      expect(disabledItems).toHaveLength(2);

      expect(buttons.at(3).hasClass(activeButtonClass)).toBeTruthy();
      expect(buttons.at(1).props().disabled).toBeTruthy();
      expect(buttons.at(5).props().disabled).toBeTruthy();
    });

    test('can select the last item', () => {
      const pagination = mountPagination({
        totalPages: 10,
        currentPage: 10,
        totalCount: 100,
        firstRowIndex: 91,
        lastRowIndex: 100,
      });
      const activeButtonClass = pagination.classes.activeButton;
      const buttons = pagination.tree.find('Button');
      const activeItems = buttons.filterWhere(b => b.hasClass(activeButtonClass) === true);
      const disabledItems = buttons.filterWhere(b => b.props().disabled === true);

      expect(buttons).toHaveLength(5);
      expect(activeItems).toHaveLength(1);
      expect(disabledItems).toHaveLength(1);

      expect(buttons.at(4).hasClass(activeButtonClass)).toBeTruthy();
      expect(buttons.at(1).props().disabled).toBeTruthy();
    });

    test('can show info about rendered pages', () => {
      const tree = mountPagination({
        totalPages: 10,
        currentPage: 2,
        totalCount: 96,
        firstRowIndex: 11,
        lastRowIndex: 20,
      }).tree;

      expect(tree.find('div > span').text()).toBe('11-20 of 96');
    });

    test('can render pagination arrows', () => {
      const onCurrentPageChange = jest.fn();
      const arrows = mountPagination({
        totalPages: 10,
        currentPage: 2,
        totalCount: 96,
        firstRowIndex: 11,
        lastRowIndex: 20,
        onCurrentPageChange,
      }).tree.find('IconButton');

      const prew = arrows.at(0);
      const next = arrows.at(1);

      triggerTouchTap(prew.node);
      triggerTouchTap(next.node);

      expect(arrows).toHaveLength(2);
      expect(prew.props().disabled).toBeFalsy();
      expect(next.props().disabled).toBeFalsy();
      expect(onCurrentPageChange.mock.calls).toHaveLength(2);
    });

    test('the prev arrow is disabled if current page is 1', () => {
      const onCurrentPageChange = jest.fn();
      const arrows = mountPagination({
        totalPages: 10,
        currentPage: 1,
        totalCount: 96,
        firstRowIndex: 1,
        lastRowIndex: 10,
        onCurrentPageChange,
      }).tree.find('IconButton');

      const prew = arrows.at(0);
      const next = arrows.at(1);

      triggerTouchTap(prew.node);
      triggerTouchTap(next.node);

      expect(prew.props().disabled).toBeTruthy();
      expect(next.props().disabled).toBeFalsy();
      expect(onCurrentPageChange.mock.calls).toHaveLength(1);
    });

    test('the next arrow is disabled if current page equals to total page count', () => {
      const onCurrentPageChange = jest.fn();
      const arrows = mountPagination({
        totalPages: 10,
        currentPage: 10,
        totalCount: 96,
        firstRowIndex: 91,
        lastRowIndex: 96,
        onCurrentPageChange,
      }).tree.find('IconButton');

      const prew = arrows.at(0);
      const next = arrows.at(1);

      triggerTouchTap(prew.node);
      triggerTouchTap(next.node);

      expect(prew.props().disabled).toBeFalsy();
      expect(next.props().disabled).toBeTruthy();
      expect(onCurrentPageChange.mock.calls).toHaveLength(1);
    });
  });
});
