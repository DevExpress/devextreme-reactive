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

    const { onCurrentDateChange, onCurrentViewNameChange } = this.props;

    const stateHelper = createStateHelper(
      this,
      {
        currentDate: () => onCurrentDateChange,
        currentViewName: () => onCurrentViewNameChange,
      },
    );

    this.changeCurrentDate = stateHelper.applyFieldReducer
      .bind(stateHelper, 'currentDate', changeCurrentDate);
    this.setCurrentViewName = stateHelper.applyFieldReducer
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

    const currentViewComputed = ({ currentView }) => {
      if (currentView !== stateCurrentViewName) {
        if (!currentView) return stateCurrentViewName;
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
        <Action name="setCurrentViewName" action={this.setCurrentViewName} />
      </Plugin>
    );
  }
}

ViewState.propTypes = {
  currentDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  defaultCurrentDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  onCurrentDateChange: PropTypes.func,
  currentViewName: PropTypes.string,
  defaultCurrentViewName: PropTypes.string,
  onCurrentViewNameChange: PropTypes.func,
};

ViewState.defaultProps = {
  currentDate: undefined,
  defaultCurrentDate: new Date(),
  onCurrentDateChange: undefined,
  currentViewName: undefined,
  defaultCurrentViewName: undefined,
  onCurrentViewNameChange: undefined,
};
