import * as React from 'react';
import * as PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'clsx';
import { cellsMeta, getViewCellKey } from '../utils';

const styles = {
  table: {
    tableLayout: 'fixed',
  },
};

const LayoutBase = React.memo(({
  setCellElementsMeta,
  cellsData,
  classes, className,
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
    <Table
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
              groupingInfo={groupingInfo}
            />
          ))}
        </Row>
      </TableBody>
    </Table>
  );
});

LayoutBase.propTypes = {
  classes: PropTypes.object.isRequired,
  formatDate: PropTypes.func.isRequired,
  cellsData: PropTypes.arrayOf(Array).isRequired,
  cellComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  rowComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  setCellElementsMeta: PropTypes.func.isRequired,
  className: PropTypes.string,
};
LayoutBase.defaultProps = {
  className: undefined,
};

export const Layout = withStyles(styles, { name: 'Layout' })(LayoutBase);
