import React from 'react';
import PropTypes from 'prop-types';
import {
  Getter,
  PluginContainer,
  Template,
  TemplateConnector,
  TemplatePlaceholder,
  TemplateRenderer,
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
          {params => (
            <TemplateConnector>
              {({ tableColumns }) => (tableColumns.length
                ? <TemplatePlaceholder />
                : <TemplateRenderer
                  template={emptyMessageTemplate}
                  params={params}
                />
              )}
            </TemplateConnector>
          )}
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
