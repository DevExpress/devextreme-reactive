import * as React from 'react';
import { mount } from 'enzyme';
import { PageSizeSelector } from './page-size-selector';

describe('PageSizeSelector', () => {
  describe('#render', () => {
    const mountPageSizeSelector = ({
      pageSize,
      pageSizes,
      getMessage = key => key,
      onPageSizeChange = () => {},
    }) => mount(<PageSizeSelector
      pageSize={pageSize}
      pageSizes={pageSizes}
      getMessage={getMessage}
      onPageSizeChange={onPageSizeChange}
    />);

    it('can show info about page sizes', () => {
      const tree = mountPageSizeSelector({
        pageSize: 10,
        pageSizes: [5, 10],
      });

      const mobileSelector = tree.find('select');
      const desktopSelector = tree.find('ul.pagination');
      const mobileSelectorItems = mobileSelector.find('option');
      const desktopSelectorItems = desktopSelector.find('li');

      expect(mobileSelector).toHaveLength(1);
      expect(mobileSelector.prop('value')).toBe(10);
      expect(mobileSelectorItems).toHaveLength(2);
      expect(mobileSelectorItems.at(0).prop('value')).toBe(5);
      expect(mobileSelectorItems.at(0).text()).toBe('5');
      expect(mobileSelectorItems.at(1).prop('value')).toBe(10);
      expect(mobileSelectorItems.at(1).text()).toBe('10');

      expect(desktopSelector).toHaveLength(1);
      expect(desktopSelectorItems).toHaveLength(2);
      expect(desktopSelectorItems.at(0).prop('className')).toBe('');
      expect(desktopSelectorItems.at(0).text()).toBe('5');
      expect(desktopSelectorItems.at(1).prop('className')).toBe('active');
      expect(desktopSelectorItems.at(1).text()).toBe('10');
    });

    it('can render the "All" item', () => {
      const tree = mountPageSizeSelector({
        pageSize: 10,
        pageSizes: [5, 10, 0],
      });

      const mobileSelector = tree.find('select');
      const desktopSelector = tree.find('ul.pagination');
      const mobileSelectorItems = mobileSelector.find('option');
      const desktopSelectorItems = desktopSelector.find('li');

      expect(mobileSelectorItems).toHaveLength(3);
      expect(mobileSelectorItems.at(2).prop('value')).toBe(0);
      expect(mobileSelectorItems.at(2).text()).toBe('showAll');

      expect(desktopSelectorItems).toHaveLength(3);
      expect(desktopSelectorItems.at(2).text()).toBe('showAll');
    });

    it('can handle the \'onPageSizeChange\' event', () => {
      const onPageSizeChange = jest.fn();
      const tree = mountPageSizeSelector({
        pageSize: 5,
        pageSizes: [5, 10],
        onPageSizeChange,
      });

      const mobileSelector = tree.find('select');
      const desktopSelector = tree.find('ul.pagination');

      mobileSelector.simulate('change', { target: { value: 10 } });
      desktopSelector.find('li > a').at(0).simulate('click');

      expect(onPageSizeChange.mock.calls[0][0]).toBe(10);
      expect(onPageSizeChange.mock.calls[1][0]).toBe(5);
    });
  });
});
