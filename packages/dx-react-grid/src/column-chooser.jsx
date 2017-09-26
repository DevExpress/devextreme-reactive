import React from 'react';
import PropTypes from 'prop-types';
import { columnChooserItems, toggleColumn } from '@devexpress/dx-grid-core';
import {
  TemplateRenderer,
} from '@devexpress/dx-react-core';


export class ColumnChooser extends React.PureComponent {
  constructor(props) {
    super(props);

    const { onHiddenColumnsChange } = props;

    this.handleColumnToggle = (columnName) => {
      if (!onHiddenColumnsChange) return;

      const { hiddenColumns } = this.props;
      const nextHiddenColumnNames = toggleColumn(hiddenColumns, columnName);
      onHiddenColumnsChange(nextHiddenColumnNames);
    };
  }
  render() {
    const { columns, hiddenColumns, contentTemplate } = this.props;
    const columnChooserItemsComputeds = columnChooserItems(columns, hiddenColumns);

    return (
      <TemplateRenderer
        template={contentTemplate}
        params={{
          columnChooserItems: columnChooserItemsComputeds,
          onColumnToggle: this.handleColumnToggle,
        }}
      />
    );
  }
}

ColumnChooser.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  hiddenColumns: PropTypes.arrayOf(PropTypes.string),
  onHiddenColumnsChange: PropTypes.func,
  contentTemplate: PropTypes.func.isRequired,
};

ColumnChooser.defaultProps = {
  hiddenColumns: [],
  onHiddenColumnsChange: undefined,
};
