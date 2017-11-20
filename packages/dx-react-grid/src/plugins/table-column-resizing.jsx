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

    this.getState = () => {
      const { state } = this;
      const { columnWidths } = this.props;

      return {
        ...state,
        columnWidths: columnWidths || state.columnWidths,
      };
    };

    this.changeTableColumnWidthsAction = (payload) => {
      const nextState = changeTableColumnWidths(this.getState(), payload);

      this.setState(nextState);

      const { onColumnWidthsChange } = this.props;
      if (onColumnWidthsChange) {
        onColumnWidthsChange(nextState.columnWidths);
      }
    };

    this.changeDraftTableColumnWidthsAction = payload =>
      this.setState(changeDraftTableColumnWidths(this.getState(), payload));
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
