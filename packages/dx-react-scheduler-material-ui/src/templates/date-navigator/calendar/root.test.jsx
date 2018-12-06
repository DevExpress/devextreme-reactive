import * as React from 'react';
import { createMount } from '@material-ui/core/test-utils';
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
  };
  describe('Root', () => {
    let mount;
    beforeAll(() => {
      mount = createMount();
    });
    afterAll(() => {
      mount.cleanUp();
    });
    beforeEach(() => {
      Table.mockImplementation(() => <div className="table" />);
    });
    afterEach(() => {
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
      const navigator = mount((
        <Root {...defaultProps} />
      )).find(defaultProps.navigatorComponent);

      const {
        currentDate,
        textComponent,
        navigationButtonComponent,
      } = navigator.props();

      expect(navigator.exists()).toBeTruthy();
      expect(currentDate).toBe('2018-07-16');
      expect(textComponent).toBe(defaultProps.textComponent);
      expect(navigationButtonComponent).toBe(defaultProps.navigationButtonComponent);
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
      const tree = mount(<Root {...defaultProps} />);
      const {
        cells,
        rowComponent,
        cellComponent,
        headerRowComponent,
        headerCellComponent,
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
      onCellClick({ nextDate: '2018-07-17' });

      expect(onSelectedDateChangeMock)
        .toBeCalledWith({ nextDate: '2018-07-17' });
      expect(tree.state().currentDate)
        .toBe('2018-07-17');
      expect(tree.state().selectedDate)
        .toBe('2018-07-17');
    });
  });
});
