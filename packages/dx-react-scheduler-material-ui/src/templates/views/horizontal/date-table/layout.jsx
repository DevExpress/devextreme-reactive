import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import TableMUI from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import RootRef from '@material-ui/core/RootRef';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  table: {
    tableLayout: 'fixed',
  },
};

const LayoutBase = ({
  cellComponent: Cell,
  rowComponent: Row,
  classes,
  dateTableRef,
  className,
  cellsData,
  ...restProps
}) => (
  <RootRef rootRef={dateTableRef}>
    <TableMUI
      className={classNames(classes.table, className)}
      {...restProps}
    >
      <TableBody>
        {cellsData.map(row => (
          <Row key={row[0].startDate.toString()}>
            {row.map(({
              startDate,
              endDate,
              isCurrent,
              isOtherMonth,
            }) => (
              <Cell
                key={startDate}
                startDate={startDate}
                endDate={endDate}
                isCurrent={isCurrent}
                isOtherMonth={isOtherMonth}
              />
            ))}
          </Row>
        ))}
      </TableBody>
    </TableMUI>
  </RootRef>
);

LayoutBase.propTypes = {
  cellsData: PropTypes.arrayOf(Array).isRequired,
  dateTableRef: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  cellComponent: PropTypes.func,
  rowComponent: PropTypes.func,
  className: PropTypes.string,
};
LayoutBase.defaultProps = {
  cellComponent: () => null,
  rowComponent: () => null,
  className: undefined,
};

export const Layout = withStyles(styles, { name: 'Layout' })(LayoutBase);
