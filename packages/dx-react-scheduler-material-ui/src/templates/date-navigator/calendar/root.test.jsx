import * as React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import { Root } from './root';
import { Table } from './table';

jest.mock('./table', () => ({
  Table: jest.fn(),
}));

describe('Calendar', () => {
  const defaultProps = {
    titleComponent: () => null,
    navigationButtonComponent: () => null,
    rowComponent: () => null,
    cellComponent: () => null,
    headerRowComponent: () => null,
    headerCellComponent: () => null,
    navigatorComponent: () => null,
    currentDate: '2018-07-16',
    firstDayOfWeek: 1,
    getHeaderCells: () => [],
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
        titleComponent,
        navigationButtonComponent,
      } = navigator.props();

      expect(navigator.exists()).toBeTruthy();
      expect(currentDate).toBe('2018-07-16');
      expect(titleComponent).toBe(defaultProps.titleComponent);
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

      onNavigate({ back: false });
      expect(tree.state().currentDate.toString())
        .toBe(new Date(2018, 6, 16).toString());
    });
    it('should render calendar table', () => {
      const tree = mount(<Root {...defaultProps} />);
      const {
        headerCells,
        cells,
        rowComponent,
        cellComponent,
        headerRowComponent,
        headerCellComponent,
      } = Table.mock.calls[0][0];

      expect(tree.find('.table').exists())
        .toBeTruthy();
      expect(headerCells)
        .toEqual(defaultProps.getHeaderCells());
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
      const onNavigateMock = jest.fn();
      const tree = mount((
        <Root
          {...defaultProps}
          onNavigate={onNavigateMock}
        />
      ));
      const { onCellClick } = Table.mock.calls[0][0];

      onCellClick({ nextDate: '2018-07-17' });

      expect(onNavigateMock)
        .toBeCalledWith({ nextDate: '2018-07-17' });
      expect(tree.state().currentDate)
        .toBe('2018-07-17');
    });
  });
});
