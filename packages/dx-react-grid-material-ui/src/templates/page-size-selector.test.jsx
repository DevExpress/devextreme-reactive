import React from 'react';
import Select from 'material-ui/Select';
import { createMount } from 'material-ui/test-utils';
import { PageSizeSelector } from './page-size-selector';

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
      const select = pageSizeSelector.find(Select);
      const selectItems = select.prop('children');

      expect(select).toHaveLength(1);
      expect(select.prop('value')).toBe(10);
      expect(selectItems).toHaveLength(2);
      expect(selectItems[0].props.value).toBe(allowedPageSizes[0]);
      expect(selectItems[1].props.value).toBe(allowedPageSizes[1]);
    });

    it('can render the \'All\' item', () => {
      const pageSizeSelector = mountPageSizeSelector({
        pageSize: 0,
        allowedPageSizes: [5, 10, 0],
      });
      const select = pageSizeSelector.find(Select);
      const selectItems = select.prop('children');

      expect(selectItems[2].props.children).toBe('All');
    });

    it('can customize the \'All\' item text', () => {
      const pageSizeSelector = mountPageSizeSelector({
        pageSize: 0,
        allowedPageSizes: [5, 10, 15, 0],
        showAllText: 'Show all',
      });
      const select = pageSizeSelector.find(Select);
      const selectItems = select.prop('children');

      expect(selectItems[3].props.children).toBe('Show all');
    });

    it('can handle the \'onPageSizeChange\' event', () => {
      const onPageSizeChange = jest.fn();
      const pageSizeSelector = mountPageSizeSelector({
        pageSize: 5,
        allowedPageSizes: [5, 10],
        onPageSizeChange,
      });
      const select = pageSizeSelector.find(Select);
      const onChange = select.prop('onChange');

      onChange({ target: { value: 10 } });

      expect(onPageSizeChange.mock.calls[0][0]).toBe(10);
    });
  });
});
