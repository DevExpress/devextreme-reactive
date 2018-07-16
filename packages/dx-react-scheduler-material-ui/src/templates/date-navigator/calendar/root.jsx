import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Table } from './table';

export const Root = ({
  currentDate, headerCells, cells,
  titleComponent: Title,
  navigationButtonComponent: NavigationButton,
  navigatorComponent: Navigator,
  rowComponent: Row,
  cellComponent: Cell,
  headerRowComponent: HeaderRow,
  headerCellComponent: HeaderCell,
  onCellClick, onNavigate,
  ...restProps
}) => (
  <div
    {...restProps}
  >
    <Navigator
      currentDate={currentDate}
      titleComponent={Title}
      navigationButtonComponent={NavigationButton}
      onNavigate={onNavigate}
    />
    <Table
      headerCells={headerCells}
      cells={cells}
      rowComponent={Row}
      cellComponent={Cell}
      headerRowComponent={HeaderRow}
      headerCellComponent={HeaderCell}
      onCellClick={onNavigate}
    />
  </div>
);

Root.propTypes = {
  currentDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  titleComponent: PropTypes.func.isRequired,
  navigationButtonComponent: PropTypes.func.isRequired,
  headerCells: PropTypes.array.isRequired,
  cells: PropTypes.array.isRequired,
  rowComponent: PropTypes.func.isRequired,
  cellComponent: PropTypes.func.isRequired,
  headerRowComponent: PropTypes.func.isRequired,
  headerCellComponent: PropTypes.func.isRequired,
  navigatorComponent: PropTypes.func.isRequired,
  onCellClick: PropTypes.func,
  onNavigate: PropTypes.func,
};

Root.defaultProps = {
  currentDate: new Date(),
  onNavigate: () => {},
  onCellClick: () => {},
};
