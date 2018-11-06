import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import TableMUI from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  table: {
    tableLayout: 'fixed',
  },
};

const LayoutBase = ({
  cellComponent: Cell,
  rowComponent: Row,
  cellsData,
  className,
  classes,
  ...restProps
}) => (
  <TableMUI
    className={classNames(classes.table, className)}
    {...restProps}
  >
    <TableBody>
      <Row>
        {cellsData[0].map(({
          startDate,
          endDate,
        }, index) => (
          <Cell
            key={index.toString()}
            startDate={startDate}
            endDate={endDate}
          />
        ))}
      </Row>
    </TableBody>
  </TableMUI>
);

LayoutBase.propTypes = {
  classes: PropTypes.object.isRequired,
  cellsData: PropTypes.arrayOf(Array).isRequired,
  cellComponent: PropTypes.func.isRequired,
  rowComponent: PropTypes.func.isRequired,
  className: PropTypes.string,
};
LayoutBase.defaultProps = {
  className: undefined,
};

export const Layout = withStyles(styles, { name: 'Layout' })(LayoutBase);
