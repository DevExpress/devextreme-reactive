import * as React from 'react';
import {
  Getter, Action, Plugin, createStateHelper, ActionFn,
} from '@devexpress/dx-react-core';
import { toggleDetailRowExpanded, ToggleRowPayload } from '@devexpress/dx-grid-core';
import { RowDetailStateProps, RowDetailStateState } from '../types';

// tslint:disable-next-line: max-line-length
class RowDetailStateBase extends React.PureComponent<RowDetailStateProps, RowDetailStateState> {
  static defaultProps = {
    defaultExpandedRowIds: [],
  };
  toggleDetailRowExpanded: ActionFn<ToggleRowPayload>;

  constructor(props) {
    super(props);

    this.state = {
      expandedRowIds: props.expandedRowIds || props.defaultExpandedRowIds,
    };

    const stateHelper = createStateHelper(
      this,
      {
        expandedRowIds: () => {
          const { onExpandedRowIdsChange } = this.props;
          return onExpandedRowIdsChange;
        },
      },
    );

    this.toggleDetailRowExpanded = stateHelper.applyFieldReducer
      .bind(stateHelper, 'expandedRowIds', toggleDetailRowExpanded);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      expandedRowIds = prevState.expandedRowIds,
    } = nextProps;

    return {
      expandedRowIds,
    };
  }

  render() {
    const { expandedRowIds } = this.state;

    return (
      <Plugin
        name="RowDetailState"
      >
        <Getter name="expandedDetailRowIds" value={expandedRowIds} />
        <Action name="toggleDetailRowExpanded" action={this.toggleDetailRowExpanded} />
      </Plugin>
    );
  }
}

/** A plugin that manages the expanded state for table row details. */
export const RowDetailState: React.ComponentType<RowDetailStateProps> = RowDetailStateBase;
