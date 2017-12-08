import React from 'react';
import PropTypes from 'prop-types';
import { PluginContainer, Template } from '@devexpress/dx-react-core';

// eslint-disable-next-line react/prefer-stateless-function
export class DataTypeProvider extends React.PureComponent {
  render() {
    const {
      type,
      formatterComponent: Formatter,
      editorComponent: Editor,
    } = this.props;
    return (
      <PluginContainer name="DataTypeProvider">
        {Formatter
          ? (
            <Template
              name="valueFormatter"
              predicate={({ column }) => column.dataType === type}
            >
              {params => <Formatter {...params} />}
            </Template>
          )
          : null
        }
        {Editor
          ? (
            <Template
              name="valueEditor"
              predicate={({ column }) => column.dataType === type}
            >
              {params => <Editor {...params} />}
            </Template>
          )
          : null
        }
      </PluginContainer>
    );
  }
}

DataTypeProvider.propTypes = {
  type: PropTypes.string,
  formatterComponent: PropTypes.func,
  editorComponent: PropTypes.func,
};

DataTypeProvider.defaultProps = {
  type: undefined,
  formatterComponent: undefined,
  editorComponent: undefined,
};
