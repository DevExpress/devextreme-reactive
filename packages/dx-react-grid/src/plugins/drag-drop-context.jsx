import React from 'react';
import PropTypes from 'prop-types';
import {
  PluginContainer, Template, TemplatePlaceholder,
  TemplateConnector, TemplateRenderer,
  DragDropContext as DragDropContextCore,
} from '@devexpress/dx-react-core';

const getContainerTemplateArgs = (
  { payload, clientOffset, columnTemplate },
  { columns },
) => ({
  clientOffset,
  columns: payload
    .filter(item => item.type === 'column')
    .map(item => columns.find(column => column.name === item.columnName)),
  columnTemplate,
});

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
        <Template name="root">
          <div>
            <DragDropContextCore
              onChange={this.change}
            >
              <TemplatePlaceholder />
            </DragDropContextCore>
            {payload && (
              <TemplateConnector>
                {getters => (
                  <TemplateRenderer
                    template={containerTemplate}
                    params={getContainerTemplateArgs(
                      { payload, clientOffset, columnTemplate },
                      getters,
                    )}
                  />
                )}
              </TemplateConnector>
            )}
          </div>
        </Template>
      </PluginContainer>
    );
  }
}

DragDropContext.propTypes = {
  containerTemplate: PropTypes.func.isRequired,
  columnTemplate: PropTypes.func.isRequired,
};
