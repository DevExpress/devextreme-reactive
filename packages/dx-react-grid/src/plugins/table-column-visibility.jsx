import React from 'react';
import PropTypes from 'prop-types';
import {
  Getter,
  PluginContainer,
  Template,
  TemplateConnector,
  TemplatePlaceholder,
} from '@devexpress/dx-react-core';
import { visibleTableColumns, getMessagesFormatter } from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { pluginName: 'Table' },
];

export class TableColumnVisibility extends React.PureComponent {
  render() {
    const {
      hiddenColumns,
      emptyMessageComponent: EmptyMessage,
      messages,
    } = this.props;
    const visibleTableColumnsComputed = ({ tableColumns }) =>
      visibleTableColumns(tableColumns, hiddenColumns);

    const getMessage = getMessagesFormatter(messages);

    return (
      <PluginContainer
        pluginName="TableColumnVisibility"
        dependencies={pluginDependencies}
      >
        <Getter name="tableColumns" computed={visibleTableColumnsComputed} />
        <Template name="table">
          {params => (
            <TemplateConnector>
              {({ tableColumns }) => (tableColumns.length
                ? <TemplatePlaceholder />
                : <EmptyMessage
                  getMessage={getMessage}
                  {...params}
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
  emptyMessageComponent: PropTypes.func.isRequired,
  messages: PropTypes.object,
};

TableColumnVisibility.defaultProps = {
  hiddenColumns: [],
  messages: {},
};
