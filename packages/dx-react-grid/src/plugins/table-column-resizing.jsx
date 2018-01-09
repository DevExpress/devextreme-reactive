import React from 'react';
import PropTypes from 'prop-types';
import { PluginContainer, Getter, Action } from '@devexpress/dx-react-core';
import {
  tableColumnsWithWidths,
  changeTableColumnWidth,
  changeDraftTableColumnWidth,
} from '@devexpress/dx-grid-core';
import { createStateHelper } from '../utils/state-helper';

const pluginDependencies = [
  { pluginName: 'Table' },
];

export class TableColumnResizing extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columnWidths: props.defaultColumnWidths,
      draftColumnWidths: [],
    };

    const stateHelper = createStateHelper(this);

    this.changeTableColumnWidthAction =
      stateHelper.applyReducer.bind(stateHelper, changeTableColumnWidth);

    this.changeDraftTableColumnWidthAction =
      stateHelper.applyReducer.bind(stateHelper, changeDraftTableColumnWidth);
  }
  getState() {
    return {
      ...this.state,
      columnWidths: this.props.columnWidths || this.state.columnWidths,
    };
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
        <Getter name="tableColumnResizingEnabled" value />
        <Getter name="tableColumns" computed={tableColumnsComputed} />
        <Action name="changeTableColumnWidth" action={this.changeTableColumnWidthAction} />
        <Action
          name="changeDraftTableColumnWidth"
          action={this.changeDraftTableColumnWidthAction}
        />
      </PluginContainer>
    );
  }
}

TableColumnResizing.propTypes = {
  defaultColumnWidths: PropTypes.array,
  columnWidths: PropTypes.array,
  onColumnWidthsChange: PropTypes.func,
};

TableColumnResizing.defaultProps = {
  defaultColumnWidths: [],
  columnWidths: undefined,
  onColumnWidthsChange: undefined,
};
