import * as React from 'react';
import * as PropTypes from 'prop-types';
import { memoize } from '@devexpress/dx-core';
import {
  Plugin, Getter, Action, createStateHelper,
} from '@devexpress/dx-react-core';
import {
  tableColumnsWithWidths,
  tableColumnsWithDraftWidths,
  changeTableColumnWidth,
  draftTableColumnWidth,
  cancelTableColumnWidthDraft,
} from '@devexpress/dx-grid-core';

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
    const { onColumnWidthsChange, minColumnWidth } = this.props;

    const stateHelper = createStateHelper(
      this,
      {
        columnWidths: () => onColumnWidthsChange,
      },
    );

    this.tableColumnsComputed = memoize(
      columnWidths => ({ tableColumns }) => tableColumnsWithWidths(tableColumns, columnWidths),
    );
    this.tableColumnsDraftComputed = memoize(
      draftColumnWidths => (
        { tableColumns },
      ) => tableColumnsWithDraftWidths(tableColumns, draftColumnWidths),
    );

    this.changeTableColumnWidth = stateHelper.applyReducer.bind(
      stateHelper, (prevState, payload) => changeTableColumnWidth(
        prevState,
        { ...payload, minColumnWidth },
      ),
    );
    this.draftTableColumnWidth = stateHelper.applyReducer.bind(
      stateHelper, (prevState, payload) => draftTableColumnWidth(
        prevState,
        { ...payload, minColumnWidth },
      ),
    );
    this.cancelTableColumnWidthDraft = stateHelper.applyReducer.bind(
      stateHelper, cancelTableColumnWidthDraft,
    );
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      columnWidths = prevState.columnWidths,
    } = nextProps;

    return {
      columnWidths,
    };
  }

  render() {
    const { columnWidths, draftColumnWidths } = this.state;

    const tableColumnsComputed = this.tableColumnsComputed(columnWidths);
    const tableColumnsDraftComputed = this.tableColumnsDraftComputed(draftColumnWidths);

    return (
      <Plugin
        name="TableColumnResizing"
        dependencies={pluginDependencies}
      >
        <Getter name="tableColumnResizingEnabled" value />
        <Getter name="tableColumns" computed={tableColumnsComputed} />
        <Getter name="tableColumns" computed={tableColumnsDraftComputed} />
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
  minColumnWidth: PropTypes.number.isRequired,
};

TableColumnResizing.defaultProps = {
  defaultColumnWidths: [],
  columnWidths: undefined,
  onColumnWidthsChange: undefined,
};
