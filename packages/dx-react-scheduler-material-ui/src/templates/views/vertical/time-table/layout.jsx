import * as React from 'react';
import * as PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import RootRef from '@material-ui/core/RootRef';

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
    const { setCellElements } = this.props;

    const cellElements = Array.from(this.table.current.querySelectorAll('td'));
    const cellElementsMeta = {
      parentRect: () => this.table.current.getBoundingClientRect(),
      getCellRects: cellElements.map(element => () => element.getBoundingClientRect()),
    };
    setCellElements(cellElementsMeta);
  }

  render() {
    const {
      cellComponent: Cell,
      rowComponent: Row,
      classes,
      className,
      cellsData,
      formatDate,
      ...restProps
    } = this.props;

    return (
      <RootRef rootRef={this.table}>
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
  classes: PropTypes.object.isRequired,
  cellsData: PropTypes.arrayOf(Array).isRequired,
  cellComponent: PropTypes.func.isRequired,
  rowComponent: PropTypes.func.isRequired,
  formatDate: PropTypes.func.isRequired,
  setCellElements: PropTypes.func.isRequired,
  className: PropTypes.string,
};
LayoutBase.defaultProps = {
  className: undefined,
};

export const Layout = withStyles(styles, { name: 'Layout' })(LayoutBase);
