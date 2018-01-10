import React from 'react';
import PropTypes from 'prop-types';
import {
  Action,
  Getter,
  PluginContainer,
  Template,
  TemplateConnector,
  TemplatePlaceholder,
} from '@devexpress/dx-react-core';
import { getMessagesFormatter, toggleColumn, visibleTableColumns } from '@devexpress/dx-grid-core';
import { createStateHelper } from '../utils/state-helper';

const pluginDependencies = [
  { pluginName: 'Table' },
];

const visibleTableColumnsComputed = ({ tableColumns, hiddenColumns }) =>
  visibleTableColumns(tableColumns, hiddenColumns);

export class TableColumnVisibility extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hiddenColumns: props.defaultHiddenColumns,
    };
    const stateHelper = createStateHelper(this);

    this.toggleColumnVisibility = stateHelper.applyFieldReducer.bind(stateHelper, 'hiddenColumns', toggleColumn);
  }
  getState() {
    const {
      hiddenColumns = this.state.hiddenColumns,
    } = this.props;
    return {
      ...this.state,
      hiddenColumns,
    };
  }
  notifyStateChange(nextState, state) {
    const { hiddenColumns } = nextState;
    const { onHiddenColumnsChange } = this.props;
    if (onHiddenColumnsChange && hiddenColumns !== state.hiddenColumns) {
      onHiddenColumnsChange(hiddenColumns);
    }
  }
  render() {
    const {
      emptyMessageComponent: EmptyMessage,
      messages,
    } = this.props;
    const getMessage = getMessagesFormatter(messages);
    const { hiddenColumns } = this.getState();

    return (
      <PluginContainer
        pluginName="TableColumnVisibility"
        dependencies={pluginDependencies}
      >
        <Getter name="hiddenColumns" value={hiddenColumns} />
        <Getter name="tableColumns" computed={visibleTableColumnsComputed} />
        <Action
          name="toggleColumnVisibility"
          action={this.toggleColumnVisibility}
        />

        <Template name="table">
          {params => (
            <TemplateConnector>
              {({ columns }) => (columns.length === hiddenColumns.length
                ? <EmptyMessage
                  getMessage={getMessage}
                  {...params}
                />
                : <TemplatePlaceholder />
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
  defaultHiddenColumns: PropTypes.arrayOf(PropTypes.string),
  emptyMessageComponent: PropTypes.func.isRequired,
  onHiddenColumnsChange: PropTypes.func,
  messages: PropTypes.object,
};

TableColumnVisibility.defaultProps = {
  hiddenColumns: undefined,
  defaultHiddenColumns: [],
  onHiddenColumnsChange: undefined,
  messages: {},
};
