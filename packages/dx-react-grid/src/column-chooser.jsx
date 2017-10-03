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
    const { columns, hiddenColumns, containerTemplate, itemTemplate } = this.props;
    const items = columnChooserItems(columns, hiddenColumns);
    const handleItemToggle = item => this.handleColumnToggle(item.column.name);

    return (
      <TemplateRenderer
        template={containerTemplate}
        params={{
          items,
          onItemToggle: handleItemToggle,
        }}
      >
        {items.map(item => (
          <TemplateRenderer
            key={item.column.name}
            template={itemTemplate}
            params={{
              item,
              onToggle: () => handleItemToggle(item),
            }}
          />
        ))}
      </TemplateRenderer>
    );
  }
}

ColumnChooser.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  hiddenColumns: PropTypes.arrayOf(PropTypes.string),
  onHiddenColumnsChange: PropTypes.func,
  containerTemplate: PropTypes.func.isRequired,
  itemTemplate: PropTypes.func.isRequired,
};

ColumnChooser.defaultProps = {
  hiddenColumns: [],
  onHiddenColumnsChange: undefined,
};
