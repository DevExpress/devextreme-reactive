import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { mountWithStyles } from '../utils/testing';
import { Pagination } from './pagination';

injectTapEventPlugin();

describe('Pagination', () => {
  describe('#render', () => {
    const paginationTree = ({ totalPages, currentPage, totalCount, pageSize }) => mountWithStyles(
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        totalCount={totalCount}
        pageSize={pageSize}
        onCurrentPageChange={() => {}}
      />,
    );

    test('can select the first item', () => {
      const buttons = paginationTree({
        totalPages: 10,
        currentPage: 1,
        totalCount: 10,
        pageSize: 5,
      }).find('Button');
      const activeItems = buttons.filterWhere(b => b.props().accent === true);
      const disabledItems = buttons.filterWhere(b => b.props().disabled === true);

      expect(buttons).toHaveLength(5);
      expect(activeItems).toHaveLength(1);
      expect(disabledItems).toHaveLength(1);

      expect(buttons.at(0).props().accent).toBeTruthy();
      expect(buttons.at(3).props().disabled).toBeTruthy();
    });

    test('can select an item in the middle', () => {
      const buttons = paginationTree({
        totalPages: 10,
        currentPage: 4,
        totalCount: 10,
        pageSize: 5,
      }).find('Button');
      const activeItems = buttons.filterWhere(b => b.props().accent === true);
      const disabledItems = buttons.filterWhere(b => b.props().disabled === true);

      expect(buttons).toHaveLength(7);
      expect(activeItems).toHaveLength(1);
      expect(disabledItems).toHaveLength(2);

      expect(buttons.at(3).props().accent).toBeTruthy();
      expect(buttons.at(1).props().disabled).toBeTruthy();
      expect(buttons.at(5).props().disabled).toBeTruthy();
    });

    test('can select the last item', () => {
      const buttons = paginationTree({
        totalPages: 10,
        currentPage: 10,
        totalCount: 10,
        pageSize: 5,
      }).find('Button');
      const activeItems = buttons.filterWhere(b => b.props().accent === true);
      const disabledItems = buttons.filterWhere(b => b.props().disabled === true);

      expect(buttons).toHaveLength(5);
      expect(activeItems).toHaveLength(1);
      expect(disabledItems).toHaveLength(1);

      expect(buttons.at(4).props().accent).toBeTruthy();
      expect(buttons.at(1).props().disabled).toBeTruthy();
    });

    test('can show info about rendered pages', () => {
      const tree = paginationTree({
        totalPages: 10,
        currentPage: 2,
        totalCount: 96,
        pageSize: 10,
      });

      expect(tree.find('div > span').text()).toBe('11-20 of 96');
    });
  });
});
