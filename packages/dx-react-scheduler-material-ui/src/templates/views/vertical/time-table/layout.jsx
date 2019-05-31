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

class LayoutBase extends React.PureComponent {
  constructor(props) {
    super(props);

    this.table = null;

    this.setCells = this.setCells.bind(this);
    this.saveReference = this.saveReference.bind(this);
  }

  componentDidMount() {
    this.setCells();
  }

  componentDidUpdate() {
    this.setCells();
  }

  setCells() {
    const { setCellElements } = this.props;

    const cellElements = this.table.querySelectorAll('td');
    setCellElements(cellElements);
  }

  saveReference(ref) {
    const { tableRef } = this.props;
    this.table = ref;
    tableRef(ref);
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
      <RootRef rootRef={this.saveReference}>
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
