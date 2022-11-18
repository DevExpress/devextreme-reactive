import * as React from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import classNames from 'clsx';
import { cellsMeta, getViewCellKey } from '../utils';

const PREFIX = 'Layout';

export const classes = {
  table: `${PREFIX}-table`,
};

const StyledTable = styled(Table)({
  [`&.${classes.table}`]: {
    tableLayout: 'fixed',
  },
});

export const Layout = React.memo(({
  setCellElementsMeta,
  cellsData,
  className,
  cellComponent: Cell,
  rowComponent: Row,
  formatDate,
  ...restProps
}) => {
  const tableRef = React.useRef(null);

  React.useEffect(() => {
    const tableElement = tableRef.current;
    setCellElementsMeta(cellsMeta(tableElement));
  });

  return (
    <StyledTable
      ref={tableRef}
      className={classNames(classes.table, className)}
      {...restProps}
    >
      <TableBody>
        <Row>
          {cellsData.map(({
            startDate, endDate, endOfGroup, groupingInfo,
          }) => (
            <Cell
              key={getViewCellKey(startDate, groupingInfo)}
              startDate={startDate}
              endDate={endDate}
              endOfGroup={endOfGroup}
              hasRightBorder={endOfGroup}
              groupingInfo={groupingInfo}
            />
          ))}
        </Row>
      </TableBody>
    </StyledTable>
  );
});

Layout.propTypes = {
  formatDate: PropTypes.func.isRequired,
  cellsData: PropTypes.arrayOf(Array).isRequired,
  cellComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  rowComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  setCellElementsMeta: PropTypes.func.isRequired,
  className: PropTypes.string,
};
Layout.defaultProps = {
  className: undefined,
};
