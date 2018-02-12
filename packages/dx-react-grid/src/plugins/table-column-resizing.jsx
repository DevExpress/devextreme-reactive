import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Plugin, Getter, Action } from '@devexpress/dx-react-core';
import {
  tableColumnsWithWidths,
  changeTableColumnWidth,
  draftTableColumnWidth,
  cancelTableColumnWidthDraft,
} from '@devexpress/dx-grid-core';
import { createStateHelper } from '../utils/state-helper';

const pluginDependencies = [
  { name: 'Table' },
];

export class TableColumnResizing extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columnWidths: props.defaultColumnWidths,
      draftColumnWidths: [],
    };

    const stateHelper = createStateHelper(this);

    this.changeTableColumnWidth =
      stateHelper.applyReducer.bind(stateHelper, changeTableColumnWidth);
    this.draftTableColumnWidth =
      stateHelper.applyReducer.bind(stateHelper, draftTableColumnWidth);
    this.cancelTableColumnWidthDraft =
      stateHelper.applyReducer.bind(stateHelper, cancelTableColumnWidthDraft);
  }
  getState() {
    const {
      columnWidths = this.state.columnWidths,
    } = this.props;
    return {
      ...this.state,
      columnWidths,
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
      <Plugin
        name="TableColumnResizing"
        dependencies={pluginDependencies}
      >
        <Getter name="tableColumnResizingEnabled" value />
        <Getter name="tableColumns" computed={tableColumnsComputed} />
        <Action name="changeTableColumnWidth" action={this.changeTableColumnWidth} />
        <Action name="draftTableColumnWidth" action={this.draftTableColumnWidth} />
        <Action name="cancelTableColumnWidthDraft" action={this.cancelTableColumnWidthDraft} />
      </Plugin>
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
