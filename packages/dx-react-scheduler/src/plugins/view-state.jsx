import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Getter,
  Action,
  Plugin,
  createStateHelper,
} from '@devexpress/dx-react-core';
import { setCurrentDate } from '@devexpress/dx-scheduler-core';

export class ViewState extends React.PureComponent {
  constructor(props) {
    super(props);
    const { onCurrentDateChange } = this.props;
    this.state = {
      currentDate: props.currentDate || props.defaultCurrentDate,
    };

    const stateHelper = createStateHelper(
      this,
      {
        currentDate: () => onCurrentDateChange,
      },
    );

    this.setCurrentDate = stateHelper.applyFieldReducer
      .bind(stateHelper, 'currentDate', setCurrentDate);
  }

  componentWillReceiveProps(nextProps) {
    const {
      currentDate,
    } = nextProps;
    this.setState({
      ...currentDate !== undefined ? { currentDate } : null,
    });
  }

  render() {
    const { currentDate } = this.state;

    return (
      <Plugin
        name="ViewState"
      >
        <Getter name="currentDate" value={currentDate} />
        <Action name="setCurrentDate" action={this.setCurrentDate} />
      </Plugin>
    );
  }
}

ViewState.propTypes = {
  currentDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  defaultCurrentDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  onCurrentDateChange: PropTypes.func,
};

ViewState.defaultProps = {
  currentDate: undefined,
  defaultCurrentDate: new Date(),
  onCurrentDateChange: undefined,
};
