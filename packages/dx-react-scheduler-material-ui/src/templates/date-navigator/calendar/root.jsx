import * as React from 'react';
import * as PropTypes from 'prop-types';
import moment from 'moment';
import { Table } from './table';

export class Root extends React.PureComponent {
  constructor(props) {
    super(props);
    const { currentDate } = this.props;
    this.state = {
      currentDate,
    };
    this.onNavigate = this.onNavigate.bind(this);
    this.onCellClick = this.onCellClick.bind(this);
  }

  onNavigate({ back }) {
    const { currentDate: currentDateState } = this.state;
    const nextDate = moment(currentDateState)[back ? 'subtract' : 'add'](1, 'month');
    this.setState({ currentDate: nextDate.toDate() });
  }

  onCellClick({ nextDate }) {
    const { onNavigate } = this.props;
    onNavigate({ nextDate });
    this.setState({ currentDate: nextDate });
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
    const { currentDate: currentDateState } = this.state;
    return (
      <div
        {...restProps}
      >
        <Navigator
          currentDate={currentDateState}
          titleComponent={Title}
          navigationButtonComponent={NavigationButton}
          onNavigate={this.onNavigate}
        />
        <Table
          headerCells={getHeaderCells(currentDateState, firstDayOfWeek, 7)}
          cells={getCells(currentDateState, firstDayOfWeek)}
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
  currentDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]).isRequired,
  firstDayOfWeek: PropTypes.number,
  onNavigate: PropTypes.func,
};

Root.defaultProps = {
  onNavigate: () => {},
  firstDayOfWeek: 0,
};
