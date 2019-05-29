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

class LayoutBase extends React.PureComponent {
  constructor(props) {
    super(props);

    this.table = null;

    this.saveReference = this.saveReference.bind(this);
  }

  componentDidMount() {
    const { setCellElements } = this.props;

    const cellElements = this.table.querySelectorAll('td');
    setCellElements(cellElements);
  }

  componentDidUpdate() {
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
      cellComponent: Cell,
      rowComponent: Row,
      classes,
      tableRef,
      className,
      cellsData,
      formatDate,
      setCellElements,
      ...restProps
    } = this.props;
    return (
      <RootRef rootRef={this.saveReference}>
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
                  today,
                  otherMonth,
                }) => (
                  <Cell
                    key={startDate}
                    startDate={startDate}
                    endDate={endDate}
                    today={today}
                    otherMonth={otherMonth}
                    formatDate={formatDate}
                  />
                ))}
              </Row>
            ))}
          </TableBody>
        </TableMUI>
      </RootRef>
    );
  }
}

LayoutBase.propTypes = {
  cellsData: PropTypes.arrayOf(Array).isRequired,
  tableRef: PropTypes.func.isRequired,
  setCellElements: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  cellComponent: PropTypes.func.isRequired,
  rowComponent: PropTypes.func.isRequired,
  formatDate: PropTypes.func.isRequired,
  className: PropTypes.string,
};
LayoutBase.defaultProps = {
  className: undefined,
};

export const Layout = withStyles(styles, { name: 'Layout' })(LayoutBase);
