import * as React from 'react';
import {
  Getter, Action, Plugin, createStateHelper, StateHelper, ActionFn,
} from '@devexpress/dx-react-core';
import { VirtualTableStateProps, VirtualTableStateState } from '../types';

// tslint:disable-next-line: max-line-length
export class VirtualTableState extends React.PureComponent<VirtualTableStateProps, VirtualTableStateState> {
  setFirstRowIndex: ActionFn<number>;
  setViewportTop: ActionFn<number>;

  constructor(props) {
    super(props);

    this.state = {
      firstRowIndex: props.firstRowIndex || 0,
      viewportTop: 0,
    };

    const stateHelper: StateHelper = createStateHelper(
      this,
      {
        firstRowIndex: () => {
          const { onFirstRowIndexChange } = this.props;
          return onFirstRowIndexChange;
        },
        viewportTop: () => {
          const { onViewportTopChange } = this.props;
          return onViewportTopChange;
        },
      },
    );

    this.setFirstRowIndex = stateHelper.applyFieldReducer
      .bind(stateHelper, 'firstRowIndex', (prevIndex, index) => index);
    this.setViewportTop = stateHelper.applyFieldReducer
      .bind(stateHelper, 'viewportTop', (prevTop, top) => top);
  }

  render() {
    const { firstRowIndex, viewportTop } = this.state;

    return (
      <Plugin
        name="VirtualTableState"
      >
        <Getter name="firstRowIndex" value={firstRowIndex} />
        <Getter name="viewportTop" value={viewportTop} />
        <Getter name="totalRowCount" />

        <Action name="setFirstRowIndex" action={this.setFirstRowIndex} />
        <Action name="setViewportTop" action={this.setViewportTop} />
      </Plugin>
    );
  }
}
