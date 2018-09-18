import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Getter,
  Action,
  Plugin,
  createStateHelper,
} from '@devexpress/dx-react-core';
import { changeCurrentDate, setCurrentViewName } from '@devexpress/dx-scheduler-core';

export class ViewState extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentDate: props.currentDate || props.defaultCurrentDate,
      currentViewName: props.currentViewName || props.defaultCurrentViewName,
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
      .bind(stateHelper, 'currentViewName', setCurrentViewName);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      currentDate = prevState.currentDate,
      currentViewName = prevState.currentViewName,
    } = nextProps;

    return {
      currentDate,
      currentViewName,
    };
  }

  render() {
    const { currentDate, currentViewName: stateCurrentViewName } = this.state;
    debugger
    const currentViewComputed = ({ currentView }) => {
      if (!currentView) return { name: stateCurrentViewName };
      if (currentView.name !== stateCurrentViewName) {
        if (!currentView) return { name: stateCurrentViewName };
        if (!stateCurrentViewName) return currentView;
      }
      return currentView;
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
  currentDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
  defaultCurrentDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
  onCurrentDateChange: PropTypes.func,
  currentViewName: PropTypes.string,
  defaultCurrentViewName: PropTypes.string,
  onCurrentViewChange: PropTypes.func,
};

ViewState.defaultProps = {
  currentDate: undefined,
  defaultCurrentDate: new Date(),
  onCurrentDateChange: undefined,
  currentViewName: undefined,
  defaultCurrentViewName: undefined,
  onCurrentViewChange: undefined,
};
