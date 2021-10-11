import * as React from 'react';
import Select from '@mui/material/Select';
import Menu from '@mui/material/Menu';
import { createMount, getClasses } from '@mui/material/test-utils';
import { PageSizeSelector } from './page-size-selector';

describe('PageSizeSelector', () => {
  let mount;
  let classes;
  beforeAll(() => {
    classes = getClasses(<PageSizeSelector
      pageSize={0}
      pageSizes={[]}
      getMessage={() => {}}
      onPageSizeChange={() => {}}
    />);
  });
  beforeEach(() => {
    mount = createMount();
  });
  afterEach(() => {
    mount.cleanUp();
  });

  describe('#render', () => {
    const mountPageSizeSelector = ({
      pageSize,
      pageSizes,
      onPageSizeChange = () => {},
      getMessage = key => key,
    }) => mount((
      <PageSizeSelector
        pageSize={pageSize}
        pageSizes={pageSizes}
        getMessage={getMessage}
        onPageSizeChange={onPageSizeChange}
      />
    ));

    it('can show info about page sizes', () => {
      const pageSizes = [5, 10];
      const pageSizeSelector = mountPageSizeSelector({
        pageSize: 10,
        pageSizes,
      });
      const select = pageSizeSelector.find(Select);
      const selectItems = select.prop('children');

      expect(select).toHaveLength(1);
      expect(select.prop('value')).toBe(10);
      expect(selectItems).toHaveLength(2);
      expect(selectItems[0].props.value).toBe(pageSizes[0]);
      expect(selectItems[1].props.value).toBe(pageSizes[1]);
    });

    it('can render the "All" item', () => {
      const pageSizeSelector = mountPageSizeSelector({
        pageSize: 0,
        pageSizes: [5, 10, 0],
      });
      const select = pageSizeSelector.find(Select);
      const selectItems = select.prop('children');

      expect(selectItems[2].props.children).toBe('showAll');
    });

    it('should render "Rows per page" text', () => {
      const pageSizeSelector = mountPageSizeSelector({
        pageSize: 0,
        pageSizes: [5, 10, 15],
      });
      const label = pageSizeSelector.find(`.${classes.label}`);

      expect(label.text()).toBe('rowsPerPage');
    });

    it('can handle the "onPageSizeChange" event', () => {
      const onPageSizeChange = jest.fn();
      const pageSizeSelector = mountPageSizeSelector({
        pageSize: 5,
        pageSizes: [5, 10],
        onPageSizeChange,
      });
      const select = pageSizeSelector.find(Select);
      const onChange = select.prop('onChange');

      onChange({ target: { value: 10 } });

      expect(onPageSizeChange.mock.calls[0][0]).toBe(10);
    });

    it('should have correct classes', () => {
      const pageSizeSelector = mountPageSizeSelector({
        pageSize: 0,
        pageSizes: [5, 10, 0],
      });

      expect(pageSizeSelector.find(Menu).hasClass(classes.selectMenu))
        .toBeTruthy();
    });
  });
});
