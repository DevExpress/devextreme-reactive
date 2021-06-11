import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { Pagination as PaginationBS3 } from 'react-bootstrap';
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
    const pages = ['1', '2', '3', '10'];
    it('can render pages', () => {
      const pagination = shallow((
        <Pagination
          {...defaultProps}
        />
      )).find(PaginationBS3);

      const itemsCount = pagination.find('PaginationItem')
        .reduce((acc, item) => {
          if (pages.includes(item.childAt(0).text())) {
            return acc + 1;
          }
          return acc;
        }, 0);

      expect(itemsCount === pages.length).toBeTruthy();
    });

    it('can render pagination arrows', () => {
      const onCurrentPageChange = jest.fn();
      const pagination = shallow((
        <Pagination
          {...defaultProps}
          onCurrentPageChange={onCurrentPageChange}
        />
      )).find(PaginationBS3);

      const prev = pagination.children().first();
      const next = pagination.children().last();

      prev.simulate('click');
      next.simulate('click');

      expect(prev.props().disabled).toBeFalsy();
      expect(next.props().disabled).toBeFalsy();
      expect(onCurrentPageChange.mock.calls).toHaveLength(2);
    });

    it('should disable the prev arrow if current page is first one', () => {
      const onCurrentPageChange = jest.fn();
      const pagination = shallow((
        <Pagination
          {...defaultProps}
          currentPage={0}
          onCurrentPageChange={onCurrentPageChange}
        />
      )).find(PaginationBS3);

      const prev = pagination.children().first();
      const next = pagination.children().last();

      expect(prev.props().disabled).toBeTruthy();
      expect(next.props().disabled).toBeFalsy();
    });

    it('should disable the next arrow if current page is last one', () => {
      const onCurrentPageChange = jest.fn();
      const pagination = shallow((
        <Pagination
          {...defaultProps}
          currentPage={9}
          pageSize={5}
          onCurrentPageChange={onCurrentPageChange}
        />
      )).find(PaginationBS3);

      const prev = pagination.children().first();
      const next = pagination.children().last();

      expect(prev.props().disabled).toBeFalsy();
      expect(next.props().disabled).toBeTruthy();
    });

    it('should render aria-labels', () => {
      const pagination = shallow((
        <Pagination
          {...defaultProps}
          currentPage={9}
          pageSize={5}
        />
      )).find(PaginationBS3);

      const prev = pagination.children().first();
      const next = pagination.children().last();

      expect(prev.prop('aria-label')).toBe('Previous');
      expect(next.prop('aria-label')).toBe('Next');
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
      const arrows = mount((
        <Pagination
          {...defaultProps}
          onCurrentPageChange={onCurrentPageChange}
        />
      )).find('.pager li');

      const prev = arrows.at(0);
      const next = arrows.at(1);

      prev.find('a').simulate('click');
      next.find('a').simulate('click');

      expect(arrows).toHaveLength(2);
      expect(prev.hasClass('disabled')).toBeFalsy();
      expect(next.hasClass('disabled')).toBeFalsy();
      expect(onCurrentPageChange.mock.calls).toHaveLength(2);
    });

    it('should disable the prev arrow if current page is first one', () => {
      const onCurrentPageChange = jest.fn();
      const arrows = mount((
        <Pagination
          {...defaultProps}
          currentPage={0}
          onCurrentPageChange={onCurrentPageChange}
        />
      )).find('.pager li');

      const prev = arrows.at(0);
      const next = arrows.at(1);

      prev.find('a').simulate('click');
      next.find('a').simulate('click');

      expect(prev.hasClass('disabled')).toBeTruthy();
      expect(next.hasClass('disabled')).toBeFalsy();
      expect(onCurrentPageChange.mock.calls).toHaveLength(1);
    });

    it('should disable the next arrow if current page is last one', () => {
      const onCurrentPageChange = jest.fn();
      const arrows = mount((
        <Pagination
          {...defaultProps}
          currentPage={9}
          pageSize={5}
          onCurrentPageChange={onCurrentPageChange}
        />
      )).find('.pager li');

      const prev = arrows.at(0);
      const next = arrows.at(1);

      prev.find('a').simulate('click');
      next.find('a').simulate('click');

      expect(prev.hasClass('disabled')).toBeFalsy();
      expect(next.hasClass('disabled')).toBeTruthy();
      expect(onCurrentPageChange.mock.calls).toHaveLength(1);
    });

    it('should render aria-labels', () => {
      const arrows = mount((
        <Pagination
          {...defaultProps}
          currentPage={9}
          pageSize={5}
        />
      )).find('.pager li a');

      const prev = arrows.at(0);
      const next = arrows.at(1);

      expect(prev.prop('aria-label')).toBe('Previous');
      expect(next.prop('aria-label')).toBe('Next');
    });
  });

  describe('ellipsis', () => {
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
        )).find(PaginationBS3);

        const buttons = pagination.find(PaginationBS3.Item);
        expect(buttons.length).toBe(pages.length + 2);

        expect(pagination.exists(PaginationBS3.Ellipsis)).toBe(false);
      });
    });
  });
});
