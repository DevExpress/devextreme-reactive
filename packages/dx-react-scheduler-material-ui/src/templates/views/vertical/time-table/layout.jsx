import * as React from 'react';
import { findDOMNode } from 'react-dom';
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

class LayoutBase extends React.PureComponent {
  componentDidMount() {
    const { setCellElements } = this.props;

    debugger
    // eslint-disable-next-line react/no-find-dom-node
    const cellElements = findDOMNode(this).querySelectorAll('td');
    setCellElements(cellElements);
  }

  componentDidUpdate() {
    const { setCellElements } = this.props;

    debugger
    // eslint-disable-next-line react/no-find-dom-node
    const cellElements = findDOMNode(this).querySelectorAll('td');
    setCellElements(cellElements);
  }

  render() {
    const {
      setCellElements,
      classes, className,
      cellComponent: Cell,
      rowComponent: Row,
      cellsData,
      tableRef,
      formatDate,
      ...restProps
    } = this.props;
    return (
      <RootRef rootRef={tableRef}>
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
      </RootRef>
    );
  }
}

LayoutBase.propTypes = {
  tableRef: PropTypes.func.isRequired,
  setCellElements: PropTypes.func.isRequired,
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
