import * as React from 'react';
import {
  Getter, Action, Plugin, createStateHelper, ActionFn,
} from '@devexpress/dx-react-core';
import { toggleSelection } from '@devexpress/dx-grid-core';
import { SelectionStateProps, SelectionStateState } from '../types';

class SelectionStateBase extends React.PureComponent<SelectionStateProps, SelectionStateState> {
  static defaultProps = {
    defaultSelection: [],
  };
  toggleSelection: ActionFn<any>;

  constructor(props) {
    super(props);

    this.state = {
      selection: props.selection || props.defaultSelection,
    };

    const stateHelper = createStateHelper(
      this,
      {
        selection: () => {
          const { onSelectionChange } = this.props;
          return onSelectionChange;
        },
      },
    );

    this.toggleSelection = stateHelper.applyFieldReducer
      .bind(stateHelper, 'selection', toggleSelection);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      selection = prevState.selection,
    } = nextProps;

    return {
      selection,
    };
  }

  render() {
    const { selection } = this.state;

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

/** A plugin that manages the selection state. */
export const SelectionState: React.ComponentType<SelectionStateProps> = SelectionStateBase;
