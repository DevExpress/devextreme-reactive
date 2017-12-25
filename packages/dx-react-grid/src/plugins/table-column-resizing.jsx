import React from 'react';
import PropTypes from 'prop-types';
import { PluginContainer, Getter, Action } from '@devexpress/dx-react-core';
import {
  tableColumnsWithWidths,
  changeTableColumnWidths,
  changeDraftTableColumnWidths,
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
      draftColumnWidths: {},
    };

    const stateHelper = createStateHelper(this);

    this.changeTableColumnWidthsAction =
      stateHelper.applyReducer.bind(stateHelper, changeTableColumnWidths);

    this.changeDraftTableColumnWidthsAction =
      stateHelper.applyReducer.bind(stateHelper, changeDraftTableColumnWidths);
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
        <Getter name="allowTableColumnResizing" value />
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
