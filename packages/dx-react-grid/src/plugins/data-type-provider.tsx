import * as React from 'react';
import { Plugin, Template, Getter, Getters } from '@devexpress/dx-react-core';
import { getAvailableFilterOperationsGetter } from '@devexpress/dx-grid-core';
import {
  DataTypeProvider as DataTypeProviderNS, DataTypeProviderProps,
} from '../types';

class DataTypeProviderBase extends React.PureComponent<DataTypeProviderProps> {
  render() {
    const {
      for: columnNames,
      formatterComponent: Formatter,
      editorComponent: Editor,
      availableFilterOperations,
    } = this.props;

    const getAvailableFilterOperationsComputed = (
      { getAvailableFilterOperations }: Getters,
    ) => getAvailableFilterOperationsGetter(
      getAvailableFilterOperations,
      availableFilterOperations!,
      columnNames,
    );

    return (
      <Plugin name="DataTypeProvider">
        <Getter
          name="getAvailableFilterOperations"
          computed={getAvailableFilterOperationsComputed}
        />
        {Formatter
          ? (
            <Template
              name="valueFormatter"
              predicate={({ column }: any) => columnNames.includes(column.name)}
            >
              {(params: DataTypeProviderNS.ValueFormatterProps) => <Formatter {...params} />}
            </Template>
          )
          : null
        }
        {Editor
          ? (
            <Template
              name="valueEditor"
              predicate={({ column }: any) => columnNames.includes(column.name)}
            >
              {(params: DataTypeProviderNS.ValueEditorProps) => <Editor {...params} />}
            </Template>
          )
          : null
        }
      </Plugin>
    );
  }
}

export const DataTypeProvider: React.ComponentType<DataTypeProviderProps> = DataTypeProviderBase;
