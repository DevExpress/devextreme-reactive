import * as React from 'react';
import { shallow } from 'enzyme';
import {
  Pagination as PaginationBS4,
  PaginationItem,
  PaginationLink,
} from '../parts/pagination';
import { Pagination } from './pagination';

const defaultProps = {
  totalPages: 10,
  currentPage: 1,
  totalCount: 96,
  pageSize: 10,
  getMessage: key => key,
  onCurrentPageChange: () => {},
};

describe('Pagination', () => {
  describe('default pagination', () => {
    it('can render pages', () => {
      const pages = ['1', '2', '3', '10'];
      const paginations = shallow((
        <Pagination
          {...defaultProps}
        />
      )).find(PaginationBS4);

      const itemsCount = paginations.at(0).find('PaginationLink')
        .reduce((acc, item) => {
          if (item.children().length && pages
            .includes(item.find('PaginationLink').childAt(0).text())
          ) {
            return acc + 1;
          }
          return acc;
        }, 0);

      expect(itemsCount === pages.length).toBeTruthy();
    });

    it('can render pagination arrows', () => {
      const onCurrentPageChange = jest.fn();
      const paginations = shallow((
        <Pagination
          {...defaultProps}
          onCurrentPageChange={onCurrentPageChange}
        />
      )).find(PaginationBS4);

      const arrows = paginations.at(0).find(PaginationItem);
      const prev = arrows.first();
      const next = arrows.last();

      prev.find(PaginationLink).simulate('click', { preventDefault: jest.fn() });
      next.find(PaginationLink).simulate('click', { preventDefault: jest.fn() });

      expect(prev.props('previews')).toBeTruthy();
      expect(next.props('next')).toBeTruthy();
      expect(onCurrentPageChange.mock.calls).toHaveLength(2);
    });

    it('should disable the prev arrow if current page is first one', () => {
      const paginations = shallow((
        <Pagination
          {...defaultProps}
          currentPage={0}
        />
      )).find(PaginationBS4);

      const arrows = paginations.at(0).find(PaginationItem);
      const prev = arrows.first();
      const next = arrows.last();

      expect(prev.props().disabled).toBeTruthy();
      expect(next.props().disabled).toBeFalsy();
    });

    it('should disable the next arrow if current page is last one', () => {
      const paginations = shallow((
        <Pagination
          {...defaultProps}
          currentPage={9}
          pageSize={5}
        />
      )).find(PaginationBS4);

      const arrows = paginations.at(0).find(PaginationItem);
      const prev = arrows.first();
      const next = arrows.last();

      expect(prev.props().disabled).toBeFalsy();
      expect(next.props().disabled).toBeTruthy();
    });
  });

  describe('xs pagination', () => {
    it('can show info about rendered pages', () => {
      const getMessage = jest.fn(key => key);
      const tree = shallow((
        <Pagination
          {...defaultProps}
          getMessage={getMessage}
        />
      ));

      expect(getMessage)
        .toBeCalledWith('info', { from: 11, to: 20, count: 96 });
      expect(tree.find('span > span').text())
        .toBe('info');
    });

    it('can render pagination arrows', () => {
      const onCurrentPageChange = jest.fn();
      const paginations = shallow((
        <Pagination
          {...defaultProps}
          onCurrentPageChange={onCurrentPageChange}
        />
      )).find(PaginationBS4);

      const arrows = paginations.at(1).find(PaginationItem);
      const prev = arrows.at(0);
      const next = arrows.at(1);

      prev.find(PaginationLink).simulate('click', { preventDefault: jest.fn() });
      next.find(PaginationLink).simulate('click', { preventDefault: jest.fn() });

      expect(arrows).toHaveLength(2);
      expect(prev.props('previews')).toBeTruthy();
      expect(next.props('next')).toBeTruthy();
      expect(onCurrentPageChange.mock.calls).toHaveLength(2);
    });

    it('should disable the prev arrow if current page is first one', () => {
      const paginations = shallow((
        <Pagination
          {...defaultProps}
          currentPage={0}
        />
      )).find(PaginationBS4);

      const arrows = paginations.at(1).find(PaginationItem);
      const prev = arrows.at(0);
      const next = arrows.at(1);

      expect(prev.props().disabled).toBeTruthy();
      expect(next.props().disabled).toBeFalsy();
    });

    it('should disable the next arrow if current page is last one', () => {
      const paginations = shallow((
        <Pagination
          {...defaultProps}
          currentPage={9}
          pageSize={5}
        />
      )).find(PaginationBS4);

      const arrows = paginations.at(1).find(PaginationItem);
      const prev = arrows.at(0);
      const next = arrows.at(1);

      expect(prev.props().disabled).toBeFalsy();
      expect(next.props().disabled).toBeTruthy();
    });
  });

  describe('ellipsis', () => {
    const ellipsisText = '...';
    const pages = [1, 2, 3, 4, 5];
    const pageSize = 8;

    pages.forEach((currentPage) => {
      it(`should not render ellipsis if elements count equal total count (on ${currentPage} page)`, () => {
        const pagination = shallow((
          <Pagination
            {...defaultProps}
            totalPages={pages.length}
            currentPage={currentPage}
            totalCount={pageSize * pages.length}
            pageSize={pageSize}
          />
        )).find(PaginationBS4).at(0);

        const buttons = pagination.find(PaginationItem);
        expect(buttons.length).toBe(pages.length + 2);

        const ellipsis = buttons.findWhere(button => button.text() === ellipsisText);
        expect(ellipsis.length).toBe(0);
      });
    });
  });
});
