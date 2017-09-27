import React from 'react';
import PropTypes from 'prop-types';
import {
  Getter,
  PluginContainer,
  Template,
  TemplateConnector,
  TemplatePlaceholder,
} from '@devexpress/dx-react-core';
import { visibleTableColumns } from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { pluginName: 'TableView' },
];

export class TableColumnVisibility extends React.PureComponent {
  render() {
    const { hiddenColumns, emptyMessageTemplate } = this.props;
    const visibleTableColumnsComputed = ({ tableColumns }) =>
      visibleTableColumns(tableColumns, hiddenColumns);

    return (
      <PluginContainer
        pluginName="TableColumnVisibility"
        dependencies={pluginDependencies}
      >
        <Getter name="tableColumns" computed={visibleTableColumnsComputed} />
        <Template name="tableView">
          <TemplateConnector>
            {({ tableColumns }) => (tableColumns.length
              ? <TemplatePlaceholder />
              : emptyMessageTemplate()
            )}
          </TemplateConnector>
        </Template>
      </PluginContainer>
    );
  }
}

TableColumnVisibility.propTypes = {
  hiddenColumns: PropTypes.arrayOf(PropTypes.string),
  emptyMessageTemplate: PropTypes.func.isRequired,
};

TableColumnVisibility.defaultProps = {
  hiddenColumns: [],
};
