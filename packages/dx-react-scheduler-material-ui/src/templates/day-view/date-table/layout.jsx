import * as React from 'react';
import * as PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import RootRef from '@material-ui/core/RootRef';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = {
  table: {
    tableLayout: 'fixed',
  },
};

const LayoutBase = ({
  timeScale,
  dateTableRef,
  classes, className,
  cellComponent: Cell,
  rowComponent: Row,
  ...restProps
}) => (
  <RootRef rootRef={dateTableRef}>
    <Table
      className={classNames(classes.table, className)}
      {...restProps}
    >
      <TableBody>
        {timeScale.map((time, index) => (
          <Row key={index.toString()}>
            <Cell time={time} />
          </Row>
        ))}
      </TableBody>
    </Table>
  </RootRef>
);


LayoutBase.propTypes = {
  classes: PropTypes.object.isRequired,
  timeScale: PropTypes.array,
  cellComponent: PropTypes.func,
  rowComponent: PropTypes.func,
  className: PropTypes.string,
};
LayoutBase.defaultProps = {
  timeScale: [],
  className: undefined,
  cellComponent: () => null,
  rowComponent: () => null,
};

export const Layout = withStyles(styles, { name: 'Layout' })(LayoutBase);
