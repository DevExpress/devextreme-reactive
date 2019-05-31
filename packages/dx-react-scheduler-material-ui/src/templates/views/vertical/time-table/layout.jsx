import * as React from 'react';
import * as PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { TimeTableContainer } from '../../common/time-table/layout-container';

const styles = {
  table: {
    tableLayout: 'fixed',
  },
};

class LayoutBase extends React.PureComponent {
  render() {
    const {
      classes, className,
      cellComponent: Cell,
      rowComponent: Row,
      cellsData,
      formatDate,
      tableRef,
      setCellElements,
      ...restProps
    } = this.props;

    return (
      <TimeTableContainer
        tableRef={tableRef}
        setCellElements={setCellElements}
      >
        <Table
          className={classNames(classes.table, className)}
          {...restProps}
        >
          <TableBody>
            {cellsData.map((days, index) => (
              <Row key={index.toString()}>
                {days.map(({ startDate, endDate }) => (
                  <Cell
                    key={startDate}
                    startDate={startDate}
                    endDate={endDate}
                  />
                ))}
              </Row>
            ))}
          </TableBody>
        </Table>
      </TimeTableContainer>
    );
  }
}

LayoutBase.propTypes = {
  classes: PropTypes.object.isRequired,
  cellsData: PropTypes.arrayOf(Array).isRequired,
  cellComponent: PropTypes.func.isRequired,
  rowComponent: PropTypes.func.isRequired,
  formatDate: PropTypes.func.isRequired,
  className: PropTypes.string,
};
LayoutBase.defaultProps = {
  className: undefined,
};

export const Layout = withStyles(styles, { name: 'Layout' })(LayoutBase);
