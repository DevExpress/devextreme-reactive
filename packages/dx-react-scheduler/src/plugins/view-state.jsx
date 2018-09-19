import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Getter,
  Action,
  Plugin,
  createStateHelper,
} from '@devexpress/dx-react-core';
import { changeCurrentDate, setCurrentView } from '@devexpress/dx-scheduler-core';

export class ViewState extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentDate: props.currentDate || props.defaultCurrentDate,
      currentView: props.currentView || props.defaultCurrentView,
    };

    const { onCurrentDateChange, onCurrentViewChange } = this.props;

    const stateHelper = createStateHelper(
      this,
      {
        currentDate: () => onCurrentDateChange,
        currentView: () => onCurrentViewChange,
      },
    );

    this.changeCurrentDate = stateHelper.applyFieldReducer
      .bind(stateHelper, 'currentDate', changeCurrentDate);
    this.setCurrentView = stateHelper.applyFieldReducer
      .bind(stateHelper, 'currentView', setCurrentView);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      currentDate = prevState.currentDate,
      currentView = prevState.currentView,
    } = nextProps;

    return {
      currentDate,
      currentView,
    };
  }

  render() {
    const { currentDate, currentView: stateCurrentView } = this.state;

    const currentViewComputed = ({ currentView }) => {
      if (currentView !== stateCurrentView) {
        if (!currentView) return stateCurrentView;
        if (!stateCurrentView) return currentView;
      } return currentView;
    };
    return (
      <Plugin
        name="ViewState"
      >
        <Getter name="currentDate" value={currentDate} />
        <Getter name="currentView" computed={currentViewComputed} />
        <Action name="changeCurrentDate" action={this.changeCurrentDate} />
        <Action name="setCurrentView" action={this.setCurrentView} />
      </Plugin>
    );
  }
}

ViewState.propTypes = {
  currentDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  defaultCurrentDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  onCurrentDateChange: PropTypes.func,
  currentView: PropTypes.string,
  defaultCurrentView: PropTypes.string,
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
