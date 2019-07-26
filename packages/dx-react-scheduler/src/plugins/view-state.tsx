import * as React from 'react';
import {
  Getter,
  Action,
  Plugin,
  createStateHelper,
  StateHelper,
  ActionFn,
} from '@devexpress/dx-react-core';
import {
  changeCurrentDate,
  setCurrentViewName,
  ChangeCurrentDatePayload,
} from '@devexpress/dx-scheduler-core';
import { ViewStateProps, ViewStateState } from '../types';
import { memoize } from '@devexpress/dx-core';

class ViewStateBase extends React.PureComponent<ViewStateProps, ViewStateState> {
  changeCurrentDate: ActionFn<ChangeCurrentDatePayload>;
  setCurrentViewName: ActionFn<string>;

  static defaultProps: Partial<ViewStateProps> = {
    defaultCurrentDate: new Date(),
  };

  constructor(props) {
    super(props);

    this.state = {
      currentDate: props.currentDate || props.defaultCurrentDate,
      currentViewName: props.currentViewName || props.defaultCurrentViewName,
    };

    const stateHelper: StateHelper = createStateHelper(
      this,
      {
        currentDate: () => {
          const { onCurrentDateChange } = this.props;
          return onCurrentDateChange;
        },
        currentViewName: () => {
          const { onCurrentViewNameChange } = this.props;
          return onCurrentViewNameChange;
        },
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

  getCurrentViewComputed =  memoize(currentViewName => () => (
    currentViewName
    ? { name: currentViewName }
    : undefined
  ));

  render() {
    const { currentDate, currentViewName: stateCurrentViewName } = this.state;
    return (
      <Plugin
        name="ViewState"
      >
        <Getter name="currentDate" value={currentDate} />
        <Getter name="currentView" computed={this.getCurrentViewComputed(stateCurrentViewName)} />
        <Action name="changeCurrentDate" action={this.changeCurrentDate} />
        <Action name="setCurrentViewName" action={this.setCurrentViewName} />
      </Plugin>
    );
  }
}

/** A plugin that manages the view state. It specifies the current date and the displayed view. */
export const ViewState: React.ComponentType<ViewStateProps> = ViewStateBase;
