import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Getter, Action, Plugin, createStateHelper } from '@devexpress/dx-react-core';
import { setCurrentDate, setCurrentView } from '@devexpress/dx-scheduler-core';

export class ViewState extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentDate: props.currentDate || props.defaultCurrentDate,
      currentView: props.currentView || props.defaultCurrentView,
    };

    const stateHelper = createStateHelper(
      this,
      {
        currentDate: () => this.props.onCurrentDateChange,
        currentView: () => this.props.onCurrentViewChange,
      },
    );

    this.setCurrentDate = stateHelper.applyFieldReducer
      .bind(stateHelper, 'currentDate', setCurrentDate);
    this.setCurrentView = stateHelper.applyFieldReducer
      .bind(stateHelper, 'currentView', setCurrentView);
  }
  componentWillReceiveProps(nextProps) {
    const {
      currentDate,
      currentView,
    } = nextProps;
    this.setState({
      ...currentDate !== undefined ? { currentDate } : null,
      ...currentView !== undefined ? { currentView } : null,
    });
  }
  render() {
    const { currentDate } = this.state;

    const currentViewComputed = ({ currentView }) => {
      if (currentView !== this.state.currentView) {
        if (!currentView) return this.state.currentView;
        if (!this.state.currentView) return currentView;
      } return currentView;
    };
    return (
      <Plugin
        name="ViewState"
      >
        <Getter name="currentDate" value={currentDate} />
        <Getter name="currentView" computed={currentViewComputed} />
        <Action name="setCurrentDate" action={this.setCurrentDate} />
        <Action name="setCurrentView" action={this.setCurrentView} />
      </Plugin>
    );
  }
}

ViewState.propTypes = {
  currentDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  defaultCurrentDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  onCurrentDateChange: PropTypes.func,
  currentView: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  defaultCurrentView: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  onCurrentViewChange: PropTypes.func,
};

ViewState.defaultProps = {
  currentDate: undefined,
  defaultCurrentDate: new Date(),
  onCurrentDateChange: undefined,
  currentView: undefined,
  defaultCurrentView: undefined,
  onCurrentViewChange: undefined,
};
