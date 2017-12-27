import React from 'react';
import PropTypes from 'prop-types';
import {
  PluginContainer, Getter, Template, TemplatePlaceholder,
  TemplateConnector,
  DragDropProvider as DragDropProviderCore,
} from '@devexpress/dx-react-core';

const getTargetColumns = (payload, columns) => payload
  .filter(item => item.type === 'column')
  .map(item => columns.find(column => column.name === item.columnName));

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
      <PluginContainer
        pluginName="DragDropProvider"
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
          )}
        </Template>
      </PluginContainer>
    );
  }
}

DragDropProvider.propTypes = {
  containerComponent: PropTypes.func.isRequired,
  columnComponent: PropTypes.func.isRequired,
};
