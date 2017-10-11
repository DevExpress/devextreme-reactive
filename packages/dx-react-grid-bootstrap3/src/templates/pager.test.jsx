import React from 'react';
import { mount } from 'enzyme';
import { Pagination } from 'react-bootstrap';
import { Pager } from './pager';

describe('Pager', () => {
  describe('#render', () => {
    const mountPager = ({
      currentPage,
      totalPages,
      pageSize,
      totalCount,
      getMessage,
      allowedPageSizes = [],
      onPageSizeChange = () => {},
      onCurrentPageChange = () => {},
    }) => mount(<Pager
      totalPages={totalPages}
      currentPage={currentPage}
      totalCount={totalCount}
      pageSize={pageSize}
      getMessage={getMessage || (() => {})}
      allowedPageSizes={allowedPageSizes}
      onCurrentPageChange={onCurrentPageChange}
      onPageSizeChange={onPageSizeChange}
    />);

    it('can show info about rendered pages', () => {
      const tree = mountPager({
        totalPages: 10,
        currentPage: 1,
        totalCount: 96,
        pageSize: 10,
      });

      expect(tree.find('div > span > span').text()).toBe('11-20 of 96');
    });

    it('can show info about rendered pages using a custom info', () => {
      const tree = mountPager({
        totalPages: 10,
        currentPage: 1,
        totalCount: 96,
        pageSize: 10,
        getMessage: () => 'rows 11-20 of 96',
      });

      expect(tree.find('div > span > span').text()).toBe('rows 11-20 of 96');
    });

    it('can render pagination arrows', () => {
      const onCurrentPageChange = jest.fn();
      const arrows = mountPager({
        totalPages: 10,
        currentPage: 2,
        totalCount: 96,
        pageSize: 10,
        onCurrentPageChange,
      }).find('.pager li');

      const prew = arrows.at(0);
      const next = arrows.at(1);

      prew.find('a').simulate('click');
      next.find('a').simulate('click');

      expect(arrows).toHaveLength(2);
      expect(prew.hasClass('disabled')).toBeFalsy();
      expect(next.hasClass('disabled')).toBeFalsy();
      expect(onCurrentPageChange.mock.calls).toHaveLength(2);
    });

    it('disables the prev arrow if current page is 1', () => {
      const onCurrentPageChange = jest.fn();
      const arrows = mountPager({
        totalPages: 10,
        currentPage: 0,
        totalCount: 96,
        pageSize: 10,
        onCurrentPageChange,
      }).find('.pager li');

      const prew = arrows.at(0);
      const next = arrows.at(1);

      prew.find('a').simulate('click');
      next.find('a').simulate('click');

      expect(prew.hasClass('disabled')).toBeTruthy();
      expect(next.hasClass('disabled')).toBeFalsy();
      expect(onCurrentPageChange.mock.calls).toHaveLength(1);
    });

    it('disables the next arrow if current page equals to total page count', () => {
      const onCurrentPageChange = jest.fn();
      const arrows = mountPager({
        totalPages: 10,
        currentPage: 9,
        totalCount: 96,
        pageSize: 5,
        onCurrentPageChange,
      }).find('.pager li');

      const prew = arrows.at(0);
      const next = arrows.at(1);

      prew.find('a').simulate('click');
      next.find('a').simulate('click');

      expect(prew.hasClass('disabled')).toBeFalsy();
      expect(next.hasClass('disabled')).toBeTruthy();
      expect(onCurrentPageChange.mock.calls).toHaveLength(1);
    });

    it('renders page size selector', () => {
      const pageSizeSelector = mountPager({
        totalPages: 10,
        currentPage: 9,
        totalCount: 96,
        pageSize: 5,
        allowedPageSizes: [5, 10],
        getMessage: () => 'Show all',
      }).find('PageSizeSelector');

      expect(pageSizeSelector).toHaveLength(1);
      expect(pageSizeSelector.at(0).prop('getMessage')()).toBe('Show all');
    });

    it('doesn\'t render page selector if the allowedPageSizes option is not defined ', () => {
      const pageSizeSelector = mountPager({
        totalPages: 10,
        currentPage: 9,
        totalCount: 96,
        pageSize: 5,
      }).find('PageSizeSelector');

      expect(pageSizeSelector).toHaveLength(0);
    });

    it('renders pager correctly if totalCount is 0', () => {
      const tree = mountPager({
        totalPages: 0,
        currentPage: 0,
        totalCount: 0,
        pageSize: 5,
      });
      const arrows = tree.find('.pager li').filterWhere(a => a.hasClass('disabled'));

      expect(arrows).toHaveLength(2);
      expect(tree.find(Pagination).prop('items')).toBe(1);
      expect(tree.find('div > span > span').text()).toBe('0 of 0');
    });
  });
});
