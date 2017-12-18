import React from 'react';
import PropTypes from 'prop-types';
import {
  Action,
  Getter,
  PluginContainer,
  Template,
  TemplateConnector,
  TemplatePlaceholder,
  toggleColumn,
} from '@devexpress/dx-react-core';
import { visibleTableColumns, getMessagesFormatter, columnChooserItems } from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { pluginName: 'Table' },
];

export class TableColumnVisibility extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hiddenColumns: props.hiddenColumns,
      items: [],
    };

    this.handleColumnToggle = this.handleColumnToggle.bind(this);
    this.visibleTableColumnsComputed = this.visibleTableColumnsComputed.bind(this);
  }
  handleColumnToggle(columnName) {
    const { hiddenColumns } = this.state;
    const nextHiddenColumnNames = toggleColumn(hiddenColumns, columnName);
    this.setState({ hiddenColumns: nextHiddenColumnNames });
  }
  visibleTableColumnsComputed({ tableColumns, columns }) {
    const { hiddenColumns } = this.state;
    this.setState({ items: columnChooserItems(columns, hiddenColumns) });
    return visibleTableColumns(tableColumns, hiddenColumns);
  }
  render() {
    const {
      emptyMessageComponent: EmptyMessage,
      messages,
    } = this.props;
    const { items } = this.state;
    const getMessage = getMessagesFormatter(messages);

    return (
      <PluginContainer
        pluginName="TableColumnVisibility"
        dependencies={pluginDependencies}
      >
        <Getter name="tableColumns" computed={this.visibleTableColumnsComputed} />
        <Getter name="items" value={items} />
        <Action
          name="toggleVisibility"
          action={(getters, actions, columnName) => this.handleColumnToggle(columnName)}
        />

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
