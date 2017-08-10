import React from 'react';
import PropTypes from 'prop-types';
import {
  PluginContainer, Template, TemplatePlaceholder,
  DragDropContext as DragDropContextCore,
} from '@devexpress/dx-react-core';

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
      containerTemplate,
      columnTemplate,
    } = this.props;
    const {
      payload,
      clientOffset,
    } = this.state;

    return (
      <PluginContainer
        pluginName="DragDropContext"
      >
        <Template
          name="root"
          connectGetters={getter => ({
            columns: getter('columns'),
          })}
        >
          {({ columns }) => (
            <div>
              <DragDropContextCore
                onChange={this.change}
              >
                <TemplatePlaceholder />
              </DragDropContextCore>
              {payload && containerTemplate({
                clientOffset,
                columns: payload
                  .filter(item => item.type === 'column')
                  .map(item => columns.find(column => column.name === item.columnName)),
                columnTemplate,
              })}
            </div>
          )}
        </Template>
      </PluginContainer>
    );
  }
}

DragDropContext.propTypes = {
  containerTemplate: PropTypes.func.isRequired,
  columnTemplate: PropTypes.func.isRequired,
};
