import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Select from 'material-ui/Select';
import { createMount, getClasses } from 'material-ui/test-utils';
import { PageSizeSelector } from './page-size-selector';

injectTapEventPlugin();

describe('PageSizeSelector', () => {
  let mount;
  let classes;
  beforeAll(() => {
    mount = createMount();
    classes = getClasses(<PageSizeSelector
      pageSize={0}
      allowedPageSizes={[]}
      onPageSizeChange={() => {}}
    />);
  });
  afterAll(() => {
    mount.cleanUp();
  });

  describe('#render', () => {
    const mountPageSizeSelector = ({
      pageSize,
      allowedPageSizes,
      onPageSizeChange = () => {},
      showAllText,
      rowsPerPageText,
    }) => mount(
      <PageSizeSelector
        pageSize={pageSize}
        allowedPageSizes={allowedPageSizes}
        showAllText={showAllText}
        rowsPerPageText={rowsPerPageText}
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

    it('should use default \'Rows per page\' text', () => {
      const pageSizeSelector = mountPageSizeSelector({
        pageSize: 0,
        allowedPageSizes: [5, 10, 15],
      });
      const label = pageSizeSelector.find(`.${classes.label}`);
      expect(label.text()).toBe('Rows per page:');
    });

    it('can customize \'Rows per page\' text', () => {
      const pageSizeSelector = mountPageSizeSelector({
        pageSize: 0,
        allowedPageSizes: [5, 10, 15],
        rowsPerPageText: 'Count rows per page',
      });
      const label = pageSizeSelector.find(`.${classes.label}`);
      expect(label.text()).toBe('Count rows per page');
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
