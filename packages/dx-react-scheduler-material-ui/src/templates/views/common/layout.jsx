import * as React from 'react';
import PropTypes from 'prop-types';
import { Table } from './table';
import { cellsMeta } from '../../utils';

export const Layout = React.memo(({
  setCellElementsMeta,
  cellsNumber,
  children,
  ...restProps
}) => {
  const tableRef = React.useRef(null);

  React.useEffect(() => {
    const tableElement = tableRef.current;
    setCellElementsMeta(cellsMeta(tableElement));
  });

  return (
    <Table
      ref={tableRef}
      cellsNumber={cellsNumber}
      {...restProps}
    >
      {children}
    </Table>
  );
});

Layout.propTypes = {
  setCellElementsMeta: PropTypes.func.isRequired,
  cellsNumber: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};
