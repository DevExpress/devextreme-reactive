import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { createMount } from 'material-ui/test-utils';
import { PageSizeSelector } from './page-size-selector';
import { DropDownMenu } from './drop-down-menu';

injectTapEventPlugin();

describe('PageSizeSelector', () => {
  let mount;
  beforeAll(() => {
    mount = createMount();
  });
  afterAll(() => {
    mount.cleanUp();
  });

  describe('#render', () => {
    const mountPageSizeSelector = ({
      pageSize,
      allowedPageSizes,
      showAllText,
      onPageSizeChange = () => {},
    }) => mount(
      <PageSizeSelector
        pageSize={pageSize}
        allowedPageSizes={allowedPageSizes}
        showAllText={showAllText}
        onPageSizeChange={onPageSizeChange}
      />);

    it('can show info about page sizes', () => {
      const allowedPageSizes = [5, 10];
      const pageSizeSelector = mountPageSizeSelector({
        pageSize: 10,
        allowedPageSizes,
      });
      const ddMenu = pageSizeSelector.find(DropDownMenu);
      const ddMenuItems = ddMenu.prop('items');

      expect(ddMenu).toHaveLength(1);
      expect(ddMenu.prop('selectedItem')).toBe(10);
      expect(ddMenuItems).toHaveLength(2);
      expect(ddMenuItems[0]).toBe(allowedPageSizes[0]);
      expect(ddMenuItems[1]).toBe(allowedPageSizes[1]);
    });

    it('can render the \'All\' item', () => {
      const pageSizeSelector = mountPageSizeSelector({
        pageSize: 0,
        allowedPageSizes: [5, 10, 0],
      });
      const ddMenu = pageSizeSelector.find(DropDownMenu);

      expect(ddMenu.find('span').at(0).text()).toBe('All');
    });

    it('can customize the \'All\' item text', () => {
      const pageSizeSelector = mountPageSizeSelector({
        pageSize: 0,
        allowedPageSizes: [5, 10, 0],
        showAllText: 'Show all',
      });
      const ddMenu = pageSizeSelector.find(DropDownMenu);

      expect(ddMenu.find('span').at(0).text()).toBe('Show all');
    });

    it('can handle the \'onPageSizeChange\' event', () => {
      const onPageSizeChange = jest.fn();
      const pageSizeSelector = mountPageSizeSelector({
        pageSize: 5,
        allowedPageSizes: [5, 10],
        onPageSizeChange,
      });
      const ddMenu = pageSizeSelector.find(DropDownMenu);

      ddMenu.prop('onItemClick')(10);

      expect(onPageSizeChange.mock.calls[0][0]).toBe(10);
    });
  });
});
