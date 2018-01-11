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

const visibleTableColumnsComputed = ({ tableColumns, hiddenColumnNames }) =>
  visibleTableColumns(tableColumns, hiddenColumnNames);

export class TableColumnVisibility extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hiddenColumnNames: props.defaultHiddenColumnNames,
    };
    const stateHelper = createStateHelper(this);

    this.toggleColumnVisibility = stateHelper.applyFieldReducer.bind(stateHelper, 'hiddenColumnNames', toggleColumn);
  }
  getState() {
    const {
      hiddenColumnNames = this.state.hiddenColumnNames,
    } = this.props;
    return {
      ...this.state,
      hiddenColumnNames,
    };
  }
  notifyStateChange(nextState, state) {
    const { hiddenColumnNames } = nextState;
    const { onHiddenColumnNamesChange } = this.props;
    if (onHiddenColumnNamesChange && hiddenColumnNames !== state.hiddenColumnNames) {
      onHiddenColumnNamesChange(hiddenColumnNames);
    }
  }
  render() {
    const {
      emptyMessageComponent: EmptyMessage,
      messages,
    } = this.props;
    const getMessage = getMessagesFormatter(messages);
    const { hiddenColumnNames } = this.getState();

    return (
      <PluginContainer
        pluginName="TableColumnVisibility"
        dependencies={pluginDependencies}
      >
        <Getter name="hiddenColumnNames" value={hiddenColumnNames} />
        <Getter name="tableColumns" computed={visibleTableColumnsComputed} />
        <Action
          name="toggleColumnVisibility"
          action={this.toggleColumnVisibility}
        />

        <Template name="table">
          {params => (
            <TemplateConnector>
              {({ columns }) => (columns.length === hiddenColumnNames.length
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
  hiddenColumnNames: PropTypes.arrayOf(PropTypes.string),
  defaultHiddenColumnNames: PropTypes.arrayOf(PropTypes.string),
  emptyMessageComponent: PropTypes.func.isRequired,
  onHiddenColumnNamesChange: PropTypes.func,
  messages: PropTypes.object,
};

TableColumnVisibility.defaultProps = {
  hiddenColumnNames: undefined,
  defaultHiddenColumnNames: [],
  onHiddenColumnNamesChange: undefined,
  messages: {},
};
