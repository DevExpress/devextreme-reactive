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
      data: null, // [{ type: 'column', payload: { columnName: 'region' } }],
      clientOffset: null, // { x: 500, y: 500 },
    };

    this.track = ({ data, clientOffset }) => this.setState({ data, clientOffset });
  }
  render() {
    const {
      containerTemplate,
      columnTemplate,
    } = this.props;
    const {
      data,
      clientOffset,
    } = this.state;

    return (
      <PluginContainer>
        <Template
          name="root"
          connectGetters={getter => ({
            columns: getter('columns'),
          })}
        >
          {({ columns }) => (
            <div>
              <DragDropContextCore
                onChange={this.track}
              >
                <TemplatePlaceholder />
              </DragDropContextCore>
              <div
                style={{
                  position: 'fixed',
                  pointerEvents: 'none',
                  zIndex: 1000,
                  left: 0,
                  top: 0,
                  width: '100%',
                  height: '100%',
                }}
              >
                {data && containerTemplate({
                  clientOffset,
                  columns: data
                    .filter(item => item.type === 'column')
                    .map(item => columns.find(column => column.name === item.payload.columnName)),
                  columnTemplate,
                })}
              </div>
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
