import React from 'react';
import PropTypes from 'prop-types';
import { Getter, PluginContainer } from '@devexpress/dx-react-core';
import { visibleTableColumns } from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { pluginName: 'TableView' },
];

export class TableColumnVisibility extends React.PureComponent {
  render() {
    const { hiddenColumnNames } = this.props;
    const visibleTableColumnsComputed = ({ tableColumns }) =>
      visibleTableColumns(tableColumns, hiddenColumnNames);

    return (
      <PluginContainer
        pluginName="TableColumnVisibility"
        dependencies={pluginDependencies}
      >
        <Getter name="tableColumns" computed={visibleTableColumnsComputed} />
      </PluginContainer>
    );
  }
}

TableColumnVisibility.propTypes = {
  hiddenColumnNames: PropTypes.arrayOf(PropTypes.string),
};

TableColumnVisibility.defaultProps = {
  hiddenColumnNames: [],
};
