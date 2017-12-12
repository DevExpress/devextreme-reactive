import React from 'react';
import PropTypes from 'prop-types';
import { PluginContainer, Getter, Action } from '@devexpress/dx-react-core';
import {
  tableColumnsWithWidths,
  changeTableColumnWidths,
  changeDraftTableColumnWidths,
} from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { pluginName: 'Table' },
];

export class TableColumnResizing extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columnWidths: props.defaultColumnWidths,
      draftColumnWidths: {},
    };

    this.changeTableColumnWidthsAction = (payload) => {
      this.applyReducer(state => changeTableColumnWidths(state, payload));
    };
    this.changeDraftTableColumnWidthsAction = (payload) => {
      this.applyReducer(state => changeDraftTableColumnWidths(state, payload));
    };
  }
  getState(temporaryState) {
    return {
      ...this.state,
      columnWidths: this.props.columnWidths || this.state.columnWidths,
      ...(this.state !== temporaryState ? temporaryState : null),
    };
  }
  applyReducer(reduce, payload) {
    const stateUpdater = (prevState) => {
      const state = this.getState(prevState);
      const nextState = { ...state, ...reduce(state, payload) };

      if (stateUpdater === this.lastStateUpdater) {
        this.notifyStateChange(nextState, state);
      }

      return nextState;
    };
    this.lastStateUpdater = stateUpdater;

    this.setState(stateUpdater);
  }
  notifyStateChange(nextState, state) {
    const { columnWidths } = nextState;
    const { onColumnWidthsChange } = this.props;
    if (onColumnWidthsChange && columnWidths !== state.columnWidths) {
      onColumnWidthsChange(columnWidths);
    }
  }
  render() {
    const { columnWidths, draftColumnWidths } = this.getState();

    const tableColumnsComputed = ({ tableColumns }) =>
      tableColumnsWithWidths(tableColumns, columnWidths, draftColumnWidths);

    return (
      <PluginContainer
        pluginName="TableColumnResizing"
        dependencies={pluginDependencies}
      >
        <Getter name="tableColumns" computed={tableColumnsComputed} />
        <Action name="changeTableColumnWidths" action={this.changeTableColumnWidthsAction} />
        <Action
          name="changeDraftTableColumnWidths"
          action={this.changeDraftTableColumnWidthsAction}
        />
      </PluginContainer>
    );
  }
}

TableColumnResizing.propTypes = {
  defaultColumnWidths: PropTypes.objectOf(PropTypes.number),
  columnWidths: PropTypes.objectOf(PropTypes.number),
  onColumnWidthsChange: PropTypes.func,
};

TableColumnResizing.defaultProps = {
  defaultColumnWidths: {},
  columnWidths: undefined,
  onColumnWidthsChange: undefined,
};
