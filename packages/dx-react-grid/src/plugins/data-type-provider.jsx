import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Plugin, Template } from '@devexpress/dx-react-core';

// eslint-disable-next-line react/prefer-stateless-function
export class DataTypeProvider extends React.PureComponent {
  render() {
    const {
      for: columnNames,
      formatterComponent: Formatter,
      editorComponent: Editor,
    } = this.props;
    return (
      <Plugin name="DataTypeProvider">
        {Formatter
          ? (
            <Template
              name="valueFormatter"
              predicate={({ column }) => columnNames.includes(column.name)}
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
              predicate={({ column }) => columnNames.includes(column.name)}
            >
              {params => <Editor {...params} />}
            </Template>
          )
          : null
        }
      </Plugin>
    );
  }
}

DataTypeProvider.propTypes = {
  for: PropTypes.arrayOf(PropTypes.string).isRequired,
  formatterComponent: PropTypes.func,
  editorComponent: PropTypes.func,
};

DataTypeProvider.defaultProps = {
  formatterComponent: undefined,
  editorComponent: undefined,
};
