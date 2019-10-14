import * as React from 'react';
import * as PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'clsx';
import { cellsMeta } from '../utils';

const styles = {
  table: {
    tableLayout: 'fixed',
  },
};

class LayoutBase extends React.PureComponent {
  constructor(props) {
    super(props);

    this.table = React.createRef();
  }

  componentDidMount() {
    this.setCells();
  }

  componentDidUpdate() {
    this.setCells();
  }

  setCells() {
    const { setCellElementsMeta } = this.props;

    const tableElement = this.table.current;
    setCellElementsMeta(cellsMeta(tableElement));
  }

  render() {
    const {
      setCellElementsMeta,
      cellsData,
      classes, className,
      cellComponent: Cell,
      rowComponent: Row,
      formatDate,
      ...restProps
    } = this.props;

    return (
      <Table
        ref={this.table}
        className={classNames(classes.table, className)}
        {...restProps}
      >
        <TableBody>
          <Row>
            {cellsData.map(({
              startDate,
              endDate,
            }) => (
              <Cell
                key={startDate}
                startDate={startDate}
                endDate={endDate}
              />
            ))}
          </Row>
        </TableBody>
      </Table>
    );
  }
}

LayoutBase.propTypes = {
  classes: PropTypes.object.isRequired,
  formatDate: PropTypes.func.isRequired,
  cellsData: PropTypes.arrayOf(Array).isRequired,
  cellComponent: PropTypes.func.isRequired,
  rowComponent: PropTypes.func.isRequired,
  setCellElementsMeta: PropTypes.func.isRequired,
  className: PropTypes.string,
};
LayoutBase.defaultProps = {
  className: undefined,
};

export const Layout = withStyles(styles, { name: 'Layout' })(LayoutBase);
