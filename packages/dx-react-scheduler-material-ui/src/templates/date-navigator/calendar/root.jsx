import * as React from 'react';
import * as PropTypes from 'prop-types';
import moment from 'moment';
import { Table } from './table';

export class Root extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: this.props.currentDate,
    };
    this.onNavigate = ({ back }) => {
      const nextDate = moment(this.state.currentDate)[back ? 'subtract' : 'add'](1, 'month');
      this.setState({ currentDate: nextDate.toDate() });
    };
    this.onCellClick = ({ nextDate }) => {
      this.props.onNavigate({ nextDate });
      this.setState({ currentDate: nextDate });
    };
  }
  render() {
    const {
      currentDate, firstDayOfWeek, getHeaderCells, getCells,
      titleComponent: Title,
      navigationButtonComponent: NavigationButton,
      navigatorComponent: Navigator,
      rowComponent: Row,
      cellComponent: Cell,
      headerRowComponent: HeaderRow,
      headerCellComponent: HeaderCell,
      onNavigate,
      ...restProps
    } = this.props;

    return (
      <div
        {...restProps}
      >
        <Navigator
          currentDate={this.state.currentDate}
          titleComponent={Title}
          navigationButtonComponent={NavigationButton}
          onNavigate={this.onNavigate}
        />
        <Table
          headerCells={getHeaderCells(this.state.currentDate, firstDayOfWeek)}
          cells={getCells(this.state.currentDate, firstDayOfWeek)}
          rowComponent={Row}
          cellComponent={Cell}
          headerRowComponent={HeaderRow}
          headerCellComponent={HeaderCell}
          onCellClick={this.onCellClick}
        />
      </div>
    );
  }
}

Root.propTypes = {
  titleComponent: PropTypes.func.isRequired,
  navigationButtonComponent: PropTypes.func.isRequired,
  getHeaderCells: PropTypes.func.isRequired,
  getCells: PropTypes.func.isRequired,
  rowComponent: PropTypes.func.isRequired,
  cellComponent: PropTypes.func.isRequired,
  headerRowComponent: PropTypes.func.isRequired,
  headerCellComponent: PropTypes.func.isRequired,
  navigatorComponent: PropTypes.func.isRequired,
  currentDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  firstDayOfWeek: PropTypes.number,
  onNavigate: PropTypes.func,
};

Root.defaultProps = {
  currentDate: new Date(),
  firstDayOfWeek: 1,
  onNavigate: () => {},
};
