import * as React from 'react';
import {
  Plugin, Getter, Template, TemplatePlaceholder,
  TemplateConnector,
  DragDropProvider as DragDropProviderCore,
} from '@devexpress/dx-react-core';
import { DragDropProviderProps, DragDropProviderState } from '../types';

const getTargetColumns = (payload, columns) => payload
  .filter(item => item.type === 'column')
  .map(item => columns.find(column => column.name === item.columnName));

// tslint:disable-next-line: max-line-length
class DragDropProviderBase extends React.PureComponent<DragDropProviderProps, DragDropProviderState> {
  static components = {
    containerComponent: 'Container',
    columnComponent: 'Column',
  };
  change: (object) => void;

  constructor(props) {
    super(props);

    this.state = {
      payload: null,
      clientOffset: null,
    };

    this.change = ({ payload, clientOffset }) => this.setState({ payload, clientOffset });
  }

  render() {
    const {
      containerComponent: Container,
      columnComponent: Column,
    } = this.props;
    const {
      payload,
      clientOffset,
    } = this.state;

    return (
      <Plugin
        name="DragDropProvider"
      >
        <Getter name="draggingEnabled" value />
        <Template name="root">
          <DragDropProviderCore
            onChange={this.change}
          >
            <TemplatePlaceholder />
          </DragDropProviderCore>
          {payload && (
            <TemplateConnector>
              {({ columns }) => (
                <Container
                  clientOffset={clientOffset!}
                >
                  {getTargetColumns(payload, columns)
                    .map(column => (
                      <Column
                        key={column.name}
                        column={column}
                      />
                    ))
                  }
                </Container>
              )}
            </TemplateConnector>
          )}
        </Template>
      </Plugin>
    );
  }
}

// tslint:disable-next-line: max-line-length
/** A plugin that implements the drag-and-drop functionality and visualizes columns that are being dragged. */
export const DragDropProvider: React.ComponentType<DragDropProviderProps> = DragDropProviderBase;
