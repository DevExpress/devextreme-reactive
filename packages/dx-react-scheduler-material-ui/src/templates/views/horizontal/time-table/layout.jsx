import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import TableMUI from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import RootRef from '@material-ui/core/RootRef';
import { withStyles } from '@material-ui/core/styles';
import { cellsMeta } from '../../../utils';

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
  classes: PropTypes.object.isRequired,
  cellComponent: PropTypes.func.isRequired,
  rowComponent: PropTypes.func.isRequired,
  formatDate: PropTypes.func.isRequired,
  setCellElementsMeta: PropTypes.func.isRequired,
  className: PropTypes.string,
};
LayoutBase.defaultProps = {
  className: undefined,
};

export const Layout = withStyles(styles, { name: 'Layout' })(LayoutBase);
