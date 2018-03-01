import React from 'react';
import PropTypes from 'prop-types';
import {
  Action,
  Getter,
  Plugin,
  Template,
  TemplateConnector,
  TemplatePlaceholder,
} from '@devexpress/dx-react-core';
import { getMessagesFormatter, toggleColumn, visibleTableColumns, tableDataColumnsExist } from '@devexpress/dx-grid-core';
import { createStateHelper } from '../utils/state-helper';

const pluginDependencies = [
  { name: 'Table' },
];

const visibleTableColumnsComputed = ({ tableColumns, hiddenColumnNames }) =>
  visibleTableColumns(tableColumns, hiddenColumnNames);

export class TableColumnVisibility extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hiddenColumnNames: props.hiddenColumnNames || props.defaultHiddenColumnNames,
    };
    const stateHelper = createStateHelper(
      this,
      {
        hiddenColumnNames: () => this.props.onHiddenColumnNamesChange,
      },
    );

    this.toggleColumnVisibility = stateHelper.applyFieldReducer.bind(stateHelper, 'hiddenColumnNames', toggleColumn);
  }
  componentWillReceiveProps(nextProps) {
    const {
      hiddenColumnNames,
    } = nextProps;
    this.setState({
      ...hiddenColumnNames !== undefined ? { hiddenColumnNames } : null,
    });
  }
  render() {
    const {
      emptyMessageComponent: EmptyMessage,
      messages,
    } = this.props;
    const getMessage = getMessagesFormatter(messages);
    const { hiddenColumnNames } = this.state;

    return (
      <Plugin
        name="TableColumnVisibility"
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
              {({ tableColumns }) =>
                (tableDataColumnsExist(tableColumns)
                ? <TemplatePlaceholder />
                : <EmptyMessage
                  getMessage={getMessage}
                  {...params}
                />
              )}
            </TemplateConnector>
          )}
        </Template>
      </Plugin>
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
