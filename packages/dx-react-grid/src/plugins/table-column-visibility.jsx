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

const getMessageFn = messages => name => messages[name];
export class TableColumnVisibility extends React.PureComponent {
  render() {
    const { hiddenColumns, emptyMessageTemplate, messages } = this.props;
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
                  params={{ getMessage: getMessageFn(messages), ...params }}
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
  messages: PropTypes.shape({
    noColumns: PropTypes.string,
  }),
};

TableColumnVisibility.defaultProps = {
  hiddenColumns: [],
  messages: {},
};
