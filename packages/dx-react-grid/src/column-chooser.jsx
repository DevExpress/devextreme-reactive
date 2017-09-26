import React from 'react';
import PropTypes from 'prop-types';
import { columnChooserItems, toggleColumn } from '@devexpress/dx-grid-core';
import {
  TemplateRenderer,
} from '@devexpress/dx-react-core';


export class ColumnChooser extends React.PureComponent {
  constructor(props) {
    super(props);

    const { onHiddenColumnNamesChange } = props;

    this.handleColumnToggle = (columnName) => {
      if (!onHiddenColumnNamesChange) return;

      const { hiddenColumnNames } = this.props;
      const nextHiddenColumnNames = toggleColumn(hiddenColumnNames, columnName);
      onHiddenColumnNamesChange(nextHiddenColumnNames);
    };
  }
  render() {
    const { columns, hiddenColumnNames, contentTemplate } = this.props;
    const columnChooserItemsComputeds = columnChooserItems(columns, hiddenColumnNames);

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
  hiddenColumnNames: PropTypes.arrayOf(PropTypes.string),
  onHiddenColumnNamesChange: PropTypes.func,
  contentTemplate: PropTypes.func.isRequired,
};

ColumnChooser.defaultProps = {
  hiddenColumnNames: [],
  onHiddenColumnNamesChange: undefined,
};
