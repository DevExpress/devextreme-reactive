import * as React from 'react';
import { getMessagesFormatter } from '@devexpress/dx-core';
import {
  Action,
  Getter,
  Plugin,
  Template,
  TemplateConnector,
  TemplatePlaceholder,
  createStateHelper,
  ActionFn,
  Getters,
} from '@devexpress/dx-react-core';
import {
  toggleColumn,
  visibleTableColumns,
  tableDataColumnsExist,
  getColumnExtensionValueGetter,
} from '@devexpress/dx-grid-core';
import { TableColumnVisibilityProps, TableColumnVisibilityState } from '../types';

const pluginDependencies = [
  { name: 'Table' },
];

const defaultMessages = {
  noColumns: 'Nothing to show',
};

const visibleTableColumnsComputed = (
  { tableColumns, hiddenColumnNames }: Getters,
) => visibleTableColumns(tableColumns, hiddenColumnNames);

const columnExtensionValueGetter = (
  columnExtensions, defaultValue,
) => getColumnExtensionValueGetter(columnExtensions, 'togglingEnabled', defaultValue);

// tslint:disable-next-line: max-line-length
class TableColumnVisibilityBase extends React.PureComponent<TableColumnVisibilityProps, TableColumnVisibilityState> {
  static defaultProps = {
    defaultHiddenColumnNames: [],
    messages: {},
    columnTogglingEnabled: true,
  };
  static components = {
    emptyMessageComponent: 'EmptyMessage',
  };
  toggleColumnVisibility: ActionFn<string[]>;

  constructor(props) {
    super(props);

    this.state = {
      hiddenColumnNames: props.hiddenColumnNames || props.defaultHiddenColumnNames,
    };
    const stateHelper = createStateHelper(
      this,
      {
        hiddenColumnNames: () => {
          const { onHiddenColumnNamesChange } = this.props;
          return onHiddenColumnNamesChange;
        },
      },
    );

    this.toggleColumnVisibility = stateHelper.applyFieldReducer.bind(
      stateHelper, 'hiddenColumnNames', toggleColumn,
    );
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      hiddenColumnNames = prevState.hiddenColumnNames,
    } = nextProps;

    return {
      hiddenColumnNames,
    };
  }

  render() {
    const {
      emptyMessageComponent: EmptyMessage,
      messages,
    } = this.props;
    const getMessage = getMessagesFormatter({ ...defaultMessages, ...messages });
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

TableColumnVisibilityBase.components = {
  emptyMessageComponent: 'EmptyMessage',
};

/* tslint:disable: max-line-length */
/** A plugin that manages Grid columns' visibility. */
export const TableColumnVisibility: React.ComponentType<TableColumnVisibilityProps> = TableColumnVisibilityBase;
/* tslint:enable: max-line-length */
