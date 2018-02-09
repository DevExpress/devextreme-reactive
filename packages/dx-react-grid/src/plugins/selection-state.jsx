import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Getter, Action, Plugin } from '@devexpress/dx-react-core';
import { toggleSelection } from '@devexpress/dx-grid-core';
import { createStateHelper } from '../utils/state-helper';

export class SelectionState extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selection: props.defaultSelection,
    };

    const stateHelper = createStateHelper(this);

    this.toggleSelection = stateHelper.applyFieldReducer
      .bind(stateHelper, 'selection', toggleSelection);
  }
  getState() {
    const {
      selection = this.state.selection,
    } = this.props;
    return {
      ...this.state,
      selection,
    };
  }
  notifyStateChange(nextState, state) {
    const { selection } = nextState;
    const { onSelectionChange } = this.props;
    if (onSelectionChange && selection !== state.selection) {
      onSelectionChange(selection);
    }
  }
  render() {
    const { selection } = this.getState();

    return (
      <Plugin
        name="SelectionState"
      >
        <Getter name="selection" value={selection} />
        <Action name="toggleSelection" action={this.toggleSelection} />
      </Plugin>
    );
  }
}

SelectionState.propTypes = {
  selection: PropTypes.array,
  defaultSelection: PropTypes.array,
  onSelectionChange: PropTypes.func,
};

SelectionState.defaultProps = {
  selection: undefined,
  defaultSelection: [],
  onSelectionChange: undefined,
};
