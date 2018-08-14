import * as React from 'react';
import * as PropTypes from 'prop-types';
import { getMessagesFormatter } from '@devexpress/dx-core';
import {
  Action,
  Getter,
  Plugin,
  Template,
  TemplateConnector,
  TemplatePlaceholder,
  createStateHelper,
} from '@devexpress/dx-react-core';
import {
  toggleColumn,
  visibleTableColumns,
  tableDataColumnsExist,
  getColumnExtensionValueGetter,
} from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { name: 'Table' },
];

const visibleTableColumnsComputed = (
  { tableColumns, hiddenColumnNames },
) => visibleTableColumns(tableColumns, hiddenColumnNames);

const columnExtensionValueGetter = (columnExtensions, defaultValue) => getColumnExtensionValueGetter(columnExtensions, 'togglingEnabled', defaultValue);

export class TableColumnVisibility extends React.PureComponent {
  constructor(props) {
    super(props);

    const { onHiddenColumnNamesChange } = this.props;
    this.state = {
      hiddenColumnNames: props.hiddenColumnNames || props.defaultHiddenColumnNames,
    };
    const stateHelper = createStateHelper(
      this,
      {
        hiddenColumnNames: () => onHiddenColumnNamesChange,
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
    const { columnExtensions, columnTogglingEnabled } = this.props;

    return (
      <Plugin
        name="TableColumnVisibility"
        dependencies={pluginDependencies}
      >
        <Getter name="hiddenColumnNames" value={hiddenColumnNames} />
        <Getter name="tableColumns" computed={visibleTableColumnsComputed} />
        <Getter
          name="isColumnTogglingEnabled"
          value={columnExtensionValueGetter(columnExtensions, columnTogglingEnabled)}
        />
        <Action
          name="toggleColumnVisibility"
          action={this.toggleColumnVisibility}
        />

        <Template name="table">
          {params => (
            <TemplateConnector>
              {({ tableColumns }) => (tableDataColumnsExist(tableColumns)
                ? <TemplatePlaceholder />
                : (
                  <EmptyMessage
                    getMessage={getMessage}
                    {...params}
                  />
                )
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
  columnExtensions: PropTypes.array,
  columnTogglingEnabled: PropTypes.bool,
};

TableColumnVisibility.defaultProps = {
  hiddenColumnNames: undefined,
  defaultHiddenColumnNames: [],
  onHiddenColumnNamesChange: undefined,
  messages: {},
  columnExtensions: undefined,
  columnTogglingEnabled: true,
};
