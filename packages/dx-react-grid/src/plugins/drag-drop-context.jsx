import React from 'react';
import PropTypes from 'prop-types';
import {
  PluginContainer, Getter, Template, TemplatePlaceholder,
  TemplateConnector,
  DragDropContext as DragDropContextCore,
} from '@devexpress/dx-react-core';

const getTargetColumns = (payload, columns) => payload
  .filter(item => item.type === 'column')
  .map(item => columns.find(column => column.name === item.columnName));

export class DragDropContext extends React.PureComponent {
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
        pluginName="DragDropContext"
      >
        <Getter name="allowDragging" value />
        <Template name="root">
          <DragDropContextCore
            onChange={this.change}
          >
            <TemplatePlaceholder />
          </DragDropContextCore>
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

DragDropContext.propTypes = {
  containerComponent: PropTypes.func.isRequired,
  columnComponent: PropTypes.func.isRequired,
};
