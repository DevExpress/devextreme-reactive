import React from 'react';
import PropTypes from 'prop-types';
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
      columnWidths: props.columnWidths || props.defaultColumnWidths,
      draftColumnWidths: [],
    };

    const stateHelper = createStateHelper(
      this,
      {
        columnWidths: () => this.props.onColumnWidthsChange,
      },
    );

    this.changeTableColumnWidth =
      stateHelper.applyReducer.bind(stateHelper, changeTableColumnWidth);
    this.draftTableColumnWidth =
      stateHelper.applyReducer.bind(stateHelper, draftTableColumnWidth);
    this.cancelTableColumnWidthDraft =
      stateHelper.applyReducer.bind(stateHelper, cancelTableColumnWidthDraft);
  }
  componentWillReceiveProps(nextProps) {
    const {
      columnWidths,
    } = nextProps;
    this.setState({
      ...columnWidths !== undefined ? { columnWidths } : null,
    });
  }
  render() {
    const { columnWidths, draftColumnWidths } = this.state;

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
