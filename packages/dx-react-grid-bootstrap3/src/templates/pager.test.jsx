import React from 'react';
import { mount, shallow } from 'enzyme';
import { Pager } from './pager';

const defaultProps = {
  totalPages: 10,
  currentPage: 1,
  totalCount: 96,
  pageSize: 10,
  getMessage: key => key,
  pageSizes: [],
  onCurrentPageChange: () => {},
  onPageSizeChange: () => {},
};

describe('Pager', () => {
  describe('#render', () => {
    it('can show info about rendered pages', () => {
      const getMessage = jest.fn(key => key);
      const tree = shallow((
        <Pager
          {...defaultProps}
          getMessage={getMessage}
        />
      ));

      expect(getMessage)
        .toBeCalledWith('info', { from: 11, to: 20, count: 96 });
      expect(tree.find('div > span > span').text())
        .toBe('info');
    });

    it('can render pagination arrows', () => {
      const onCurrentPageChange = jest.fn();
      const arrows = mount((
        <Pager
          {...defaultProps}
          onCurrentPageChange={onCurrentPageChange}
        />
      )).find('.pager li');

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
      const arrows = mount((
        <Pager
          {...defaultProps}
          currentPage={0}
          onCurrentPageChange={onCurrentPageChange}
        />
      )).find('.pager li');

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
      const arrows = mount((
        <Pager
          {...defaultProps}
          currentPage={9}
          pageSize={5}
          onCurrentPageChange={onCurrentPageChange}
        />
      )).find('.pager li');

      const prew = arrows.at(0);
      const next = arrows.at(1);

      prew.find('a').simulate('click');
      next.find('a').simulate('click');

      expect(prew.hasClass('disabled')).toBeFalsy();
      expect(next.hasClass('disabled')).toBeTruthy();
      expect(onCurrentPageChange.mock.calls).toHaveLength(1);
    });

    it('renders page size selector', () => {
      const pageSizeSelector = shallow((
        <Pager
          {...defaultProps}
          pageSizes={[5, 10]}
        />
      )).find('PageSizeSelector');

      expect(pageSizeSelector)
        .toHaveLength(1);
      expect(pageSizeSelector.at(0).prop('getMessage')('showAll'))
        .toBe('showAll');
    });

    it('doesn\'t render page selector if the pageSizes option is not defined ', () => {
      const pageSizeSelector = shallow((
        <Pager
          {...defaultProps}
        />
      )).find('PageSizeSelector');

      expect(pageSizeSelector).toHaveLength(0);
    });

    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Pager
          {...defaultProps}
          onClick="onClick"
        />
      ));

      expect(tree.prop('onClick'))
        .toBe('onClick');
    });

    it('should add the passed className to the root element', () => {
      const tree = shallow((
        <Pager
          {...defaultProps}
          className="custom-class"
        />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
    });
  });
});
