import * as React from 'react';
import { createMount } from '@devexpress/dx-testing';
import { Root } from './root';
import { Table } from './table';

jest.mock('./table', () => ({
  Table: jest.fn(),
}));

describe('Calendar', () => {
  const defaultProps = {
    textComponent: () => null,
    navigationButtonComponent: () => null,
    rowComponent: () => null,
    cellComponent: () => null,
    headerRowComponent: () => null,
    headerCellComponent: () => null,
    navigatorComponent: () => null,
    selectedDate: '2018-07-16',
    firstDayOfWeek: 1,
    getCells: () => [],
    formatDate: () => undefined,
  };
  describe('Root', () => {
    let mount;
    beforeEach(() => {
      mount = createMount();
      Table.mockImplementation(() => <div className="table" />);
    });
    afterEach(() => {
      mount.cleanUp();
      jest.clearAllMocks();
    });
    it('should pass rest props to the root element', () => {
      const tree = mount((
        <Root
          {...defaultProps}
          data={{ a: 1 }}
        />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
    it('should render navigator', () => {
      const defaultFormatDate = jest.fn();
      const navigator = mount((
        <Root {...defaultProps} formatDate={defaultFormatDate} />
      )).find(defaultProps.navigatorComponent);

      const {
        currentDate,
        textComponent,
        navigationButtonComponent,
        formatDate,
      } = navigator.props();

      expect(navigator.exists()).toBeTruthy();
      expect(currentDate).toBe('2018-07-16');
      expect(textComponent).toBe(defaultProps.textComponent);
      expect(navigationButtonComponent).toBe(defaultProps.navigationButtonComponent);
      expect(formatDate).toBe(defaultFormatDate);
    });
    it('should navigate to the prev and next month', () => {
      const tree = mount((
        <Root {...defaultProps} />
      ));
      const { onNavigate } = tree.find(defaultProps.navigatorComponent).props();

      onNavigate({ back: true });
      expect(tree.state().currentDate.toString())
        .toBe(new Date(2018, 5, 16).toString());
      expect(tree.state().selectedDate.toString())
        .toBe(defaultProps.selectedDate);

      onNavigate({ back: false });
      expect(tree.state().currentDate.toString())
        .toBe(new Date(2018, 6, 16).toString());
      expect(tree.state().selectedDate.toString())
        .toBe(defaultProps.selectedDate);
    });
    it('should render calendar table', () => {
      const defaultFormatDate = jest.fn();
      const tree = mount(<Root {...defaultProps} formatDate={defaultFormatDate} />);
      const {
        cells,
        rowComponent,
        cellComponent,
        headerRowComponent,
        headerCellComponent,
        formatDate,
      } = Table.mock.calls[0][0];

      expect(tree.find('.table').exists())
        .toBeTruthy();
      expect(cells)
        .toEqual(defaultProps.getCells());
      expect(rowComponent)
        .toBe(defaultProps.rowComponent);
      expect(cellComponent)
        .toBe(defaultProps.cellComponent);
      expect(headerRowComponent)
        .toBe(defaultProps.headerRowComponent);
      expect(headerCellComponent)
        .toBe(defaultProps.headerCellComponent);
      expect(formatDate)
        .toBe(defaultFormatDate);
    });
    it('should handle table cell click', () => {
      const onSelectedDateChangeMock = jest.fn();
      const tree = mount((
        <Root
          {...defaultProps}
          onSelectedDateChange={onSelectedDateChangeMock}
        />
      ));
      const { onCellClick } = Table.mock.calls[0][0];
      onCellClick('2018-07-17');

      expect(onSelectedDateChangeMock)
        .toBeCalledWith('2018-07-17');
      expect(tree.state().currentDate)
        .toBe('2018-07-17');
      expect(tree.state().selectedDate)
        .toBe('2018-07-17');
    });
  });
});
