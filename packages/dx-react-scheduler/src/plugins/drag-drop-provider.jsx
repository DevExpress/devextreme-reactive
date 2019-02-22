import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Plugin, Getter, Template, TemplatePlaceholder,
  TemplateConnector,
  DragDropProvider as DragDropProviderCore,
} from '@devexpress/dx-react-core';

const getTargetColumns = (payload, columns) => payload
  .filter(item => item.type === 'column')
  .map(item => columns.find(column => column.name === item.columnName));

// tslint:disable-next-line: max-line-length
export class DragDropProvider extends React.PureComponent {
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
          {/* {payload && (
            <TemplateConnector>
              {({ columns }) => (
                <Container
                  clientOffset={clientOffset}
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
          )} */}
        </Template>
      </Plugin>
    );
  }
}

DragDropProvider.propTypes = {
  // containerComponent: PropTypes.func.isRequired,
  // columnComponent: PropTypes.func.isRequired,
  // draggingAppointment: PropTypes.func.isRequired,
  // draggingPredicate: PropTypes.func,
};

DragDropProvider.defaultProps = {
  draggingPredicate: () => true,
};

DragDropProvider.components = {
  // containerComponent: 'Container',
  // columnComponent: 'Column',
  // draggingAppointment: 'DraggingAppointment',
};
