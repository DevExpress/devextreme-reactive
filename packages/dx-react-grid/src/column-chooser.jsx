import React from 'react';
import PropTypes from 'prop-types';
import { columnChooserItems, toggleColumn } from '@devexpress/dx-grid-core';

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
    const {
      columns,
      hiddenColumns,
      containerComponent: Container,
      itemComponent: Item,
    } = this.props;
    const items = columnChooserItems(columns, hiddenColumns);
    const handleItemToggle = item => this.handleColumnToggle(item.column.name);

    return (
      <Container
        items={items}
        onItemToggle={handleItemToggle}
      >
        {items.map(item => (
          <Item
            key={item.column.name}
            item={item}
            onToggle={() => handleItemToggle(item)}
          />
        ))}
      </Container>
    );
  }
}

ColumnChooser.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  hiddenColumns: PropTypes.arrayOf(PropTypes.string),
  onHiddenColumnsChange: PropTypes.func,
  containerComponent: PropTypes.func.isRequired,
  itemComponent: PropTypes.func.isRequired,
};

ColumnChooser.defaultProps = {
  hiddenColumns: [],
  onHiddenColumnsChange: undefined,
};
