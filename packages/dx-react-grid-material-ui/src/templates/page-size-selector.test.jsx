import React from 'react';
import Select from 'material-ui/Select';
import { createMount, getClasses } from 'material-ui/test-utils';
import { PageSizeSelector } from './page-size-selector';

describe('PageSizeSelector', () => {
  let mount;
  let classes;
  beforeAll(() => {
    mount = createMount();
    classes = getClasses(<PageSizeSelector
      pageSize={0}
      allowedPageSizes={[]}
      getMessage={() => {}}
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
      getMessage,
    }) => mount(
      <PageSizeSelector
        pageSize={pageSize}
        allowedPageSizes={allowedPageSizes}
        getMessage={getMessage || (() => {})}
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
      const getMessage = jest.fn();
      const text = 'All';
      getMessage.mockImplementation(() => text);

      const pageSizeSelector = mountPageSizeSelector({
        pageSize: 0,
        allowedPageSizes: [5, 10, 0],
        getMessage,
      });
      const select = pageSizeSelector.find(Select);
      const selectItems = select.prop('children');

      expect(getMessage).toBeCalledWith('showAll');
      expect(selectItems[2].props.children).toBe(text);
    });

    it('should render \'Rows per page\' text', () => {
      const getMessage = jest.fn();
      const text = 'Rows per page:';
      getMessage.mockImplementation(() => text);

      const pageSizeSelector = mountPageSizeSelector({
        pageSize: 0,
        allowedPageSizes: [5, 10, 15],
        getMessage,
      });
      const label = pageSizeSelector.find(`.${classes.label}`);

      expect(getMessage).toBeCalledWith('rowsPerPage');
      expect(label.text()).toBe(text);
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
