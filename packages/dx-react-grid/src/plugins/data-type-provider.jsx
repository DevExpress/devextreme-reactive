import React from 'react';
import PropTypes from 'prop-types';
import { PluginContainer, Template } from '@devexpress/dx-react-core';

// eslint-disable-next-line react/prefer-stateless-function
export class DataTypeProvider extends React.PureComponent {
  render() {
    const { formatterTemplate, editorTemplate, type } = this.props;
    return (
      <PluginContainer name="DataTypeProvider">
        {formatterTemplate
          ? (
            <Template
              name="valueFormatter"
              predicate={({ column }) => column.dataType === type}
            >
              {params => formatterTemplate(params)}
            </Template>
          )
          : null
        }
        {editorTemplate
          ? (
            <Template
              name="valueEditor"
              predicate={({ column }) => column.dataType === type}
            >
              {params => editorTemplate(params)}
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
  formatterTemplate: PropTypes.func,
  editorTemplate: PropTypes.func,
};

DataTypeProvider.defaultProps = {
  type: undefined,
  formatterTemplate: undefined,
  editorTemplate: undefined,
};
