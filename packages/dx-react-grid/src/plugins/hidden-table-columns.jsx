import React from 'react';
import PropTypes from 'prop-types';
import { Getter, PluginContainer } from '@devexpress/dx-react-core';
import { visibleTableColumns } from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { pluginName: 'TableView' },
];

export class HiddenTableColumns extends React.PureComponent {
  render() {
    const { hiddenColumnNames } = this.props;
    const visibleTableColumnsComputed = ({ tableColumns }) =>
      visibleTableColumns(tableColumns, hiddenColumnNames);

    return (
      <PluginContainer
        pluginName="HiddenTableColumns"
        dependencies={pluginDependencies}
      >
        <Getter name="tableColumns" computed={visibleTableColumnsComputed} />
      </PluginContainer>
    );
  }
}

HiddenTableColumns.propTypes = {
  hiddenColumnNames: PropTypes.arrayOf(PropTypes.string),
};

HiddenTableColumns.defaultProps = {
  hiddenColumnNames: [],
};
