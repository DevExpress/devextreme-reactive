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
      dateFormat,
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
          dateFormat={dateFormat}
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
          dateFormat={dateFormat}
        />
      </div>
    );
  }
}

Root.propTypes = {
  textComponent: PropTypes.func.isRequired,
  navigationButtonComponent: PropTypes.func.isRequired,
  getCells: PropTypes.func.isRequired,
  rowComponent: PropTypes.func.isRequired,
  cellComponent: PropTypes.func.isRequired,
  headerRowComponent: PropTypes.func.isRequired,
  headerCellComponent: PropTypes.func.isRequired,
  navigatorComponent: PropTypes.func.isRequired,
  selectedDate: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]).isRequired,
  firstDayOfWeek: PropTypes.number,
  onSelectedDateChange: PropTypes.func,
};

Root.defaultProps = {
  onSelectedDateChange: () => {},
  firstDayOfWeek: 0,
};
