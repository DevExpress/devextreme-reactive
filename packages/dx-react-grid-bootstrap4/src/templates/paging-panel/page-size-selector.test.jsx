import * as React from 'react';
import { shallow } from 'enzyme';
import { Pagination, PaginationItem, PaginationLink } from '../parts/pagination';
import { PageSizeSelector } from './page-size-selector';

describe('PageSizeSelector', () => {
  describe('#render', () => {
    const defaultProps = {
      pageSize: 10,
      pageSizes: [5, 10],
      getMessage: key => key,
      onPageSizeChange: () => undefined,
    };

    it('can show info about page sizes', () => {
      const tree = shallow(<PageSizeSelector
        {...defaultProps}
      />);

      const mobileSelector = tree.find('select');
      const desktopSelector = tree.find(Pagination);
      const mobileSelectorItems = mobileSelector.find('option');
      const desktopSelectorItems = desktopSelector.find(PaginationItem);

      expect(mobileSelector).toHaveLength(1);
      expect(mobileSelector.prop('value')).toBe(10);
      expect(mobileSelectorItems).toHaveLength(2);
      expect(mobileSelectorItems.at(0).prop('value')).toBe(5);
      expect(mobileSelectorItems.at(0).text()).toBe('5');
      expect(mobileSelectorItems.at(1).prop('value')).toBe(10);
      expect(mobileSelectorItems.at(1).text()).toBe('10');

      expect(desktopSelector).toHaveLength(1);
      expect(desktopSelectorItems).toHaveLength(2);
      expect(desktopSelectorItems.at(0).prop('active')).toBe(false);
      expect(desktopSelectorItems.at(0).render().text()).toBe('5');
      expect(desktopSelectorItems.at(1).prop('active')).toBe(true);
      expect(desktopSelectorItems.at(1).render().text()).toBe('10');
    });

    it('can render the "All" item', () => {
      const tree = shallow(<PageSizeSelector
        {...defaultProps}
        pageSizes={[5, 10, 0]}
      />);

      const mobileSelector = tree.find('select');
      const mobileSelectorItems = mobileSelector.find('option');
      const desktopSelectorLastItem = tree.find(PaginationLink).last();

      expect(mobileSelectorItems).toHaveLength(3);
      expect(mobileSelectorItems.at(2).prop('value')).toBe(0);
      expect(mobileSelectorItems.at(2).text()).toBe('showAll');

      expect(desktopSelectorLastItem.render().text()).toBe('showAll');
    });

    it('can handle the \'onPageSizeChange\' event', () => {
      const onPageSizeChange = jest.fn();
      const tree = shallow(<PageSizeSelector
        {...defaultProps}
        pageSizes={[5, 10, 0]}
        onPageSizeChange={onPageSizeChange}
      />);

      const mobileSelector = tree.find('select');
      const desktopSelector = tree.find(Pagination);

      mobileSelector.simulate('change', { target: { value: 10 } });
      desktopSelector.find(PaginationLink).at(0).simulate('click', { preventDefault: jest.fn() });

      expect(onPageSizeChange.mock.calls[0][0]).toBe(10);
      expect(onPageSizeChange.mock.calls[1][0]).toBe(5);
    });
  });
});
