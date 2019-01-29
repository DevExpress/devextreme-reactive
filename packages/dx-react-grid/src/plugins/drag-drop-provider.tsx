import * as React from 'react';
import {
  Plugin, Getter, Template, TemplatePlaceholder,
  TemplateConnector,
  DragDropProvider as DragDropProviderCore,
} from '@devexpress/dx-react-core';
import { Column } from '@devexpress/dx-grid-core';

// tslint:disable-next-line: no-namespace
export namespace DragDropProvider {
  /** Describes properties of the component that renders a container for columns being dragged. */
  export interface ContainerProps {
    /** The current offset of a column that is being dragged. The offset is measured against the application's client area. */
    clientOffset: { x: number, y: number };
    /** A React node representing columns being dragged. */
    children: React.ReactNode;
  }
  /** Describes properties of the component that renders a column being dragged. */
  export interface ColumnProps {
    /** Specifies a column being dragged. */
    column: Column;
  }
}

export interface DragDropProviderProps {
  /** A component that renders a container for columns being dragged. */
  containerComponent: React.ComponentType<DragDropProvider.ContainerProps>;
  /** A component that renders a column being dragged. */
  columnComponent: React.ComponentType<DragDropProvider.ColumnProps>;
}
interface DragDropProviderState {
  payload: any | null;
  clientOffset: { x: number, y: number} | null;
}

const getTargetColumns = (payload, columns) => payload
  .filter(item => item.type === 'column')
  .map(item => columns.find(column => column.name === item.columnName));

export class DragDropProvider extends React.PureComponent<
  DragDropProviderProps, DragDropProviderState
> {
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
