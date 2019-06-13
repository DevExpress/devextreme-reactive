import * as React from 'react';
import * as PropTypes from 'prop-types';
import moment from 'moment';
import { Table } from './table';

export class Root extends React.PureComponent {
  constructor(props) {
    super(props);
    const { selectedDate } = this.props;
    this.state = {
      selectedDate,
      currentDate: selectedDate,
    };
    this.onNavigate = this.onNavigate.bind(this);
    this.onCellClick = this.onCellClick.bind(this);
  }

  onNavigate({ back }) {
    const { currentDate: currentDateState } = this.state;
    const nextDate = moment(currentDateState)[back ? 'subtract' : 'add'](1, 'month');
    this.setState({ currentDate: nextDate.toDate() });
  }

  onCellClick(nextDate) {
    const { onSelectedDateChange } = this.props;
    this.setState({ selectedDate: nextDate, currentDate: nextDate });
    onSelectedDateChange(nextDate);
  }

  render() {
    const {
      selectedDate, firstDayOfWeek, getCells,
      textComponent: Text,
      navigationButtonComponent: NavigationButton,
      navigatorComponent: Navigator,
      rowComponent: Row,
      cellComponent: Cell,
      headerRowComponent: HeaderRow,
      headerCellComponent: HeaderCell,
      onSelectedDateChange,
      formatDate,
      ...restProps
    } = this.props;
    const { selectedDate: selectedDateState, currentDate } = this.state;
    const cellsData = getCells(currentDate, firstDayOfWeek, 1, Date.now());
    return (
      <div
        {...restProps}
      >
        <Navigator
          currentDate={currentDate}
          textComponent={Text}
          navigationButtonComponent={NavigationButton}
          onNavigate={this.onNavigate}
          formatDate={formatDate}
        />
        <Table
          headerCells={cellsData[0]}
          selectedDate={selectedDateState}
          cells={cellsData}
          rowComponent={Row}
          cellComponent={Cell}
          headerRowComponent={HeaderRow}
          headerCellComponent={HeaderCell}
          onCellClick={this.onCellClick}
          formatDate={formatDate}
        />
      </div>
    );
  }
}

Root.propTypes = {
  // oneOfType is a workaround because withStyles returns react object
  textComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  navigationButtonComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  headerRowComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  headerCellComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  navigatorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  rowComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  cellComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  getCells: PropTypes.func.isRequired,
  selectedDate: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]).isRequired,
  formatDate: PropTypes.func.isRequired,
  firstDayOfWeek: PropTypes.number,
  onSelectedDateChange: PropTypes.func,
};

Root.defaultProps = {
  onSelectedDateChange: () => {},
  firstDayOfWeek: 0,
};
