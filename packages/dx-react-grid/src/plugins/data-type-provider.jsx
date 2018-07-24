import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Plugin, Template, Getter } from '@devexpress/dx-react-core';
import { getAvailableFilterOperationsGetter } from '@devexpress/dx-grid-core';

// eslint-disable-next-line react/prefer-stateless-function
export class DataTypeProvider extends React.PureComponent {
  render() {
    const {
      for: columnNames,
      formatterComponent: Formatter,
      editorComponent: Editor,
      availableFilterOperations,
    } = this.props;

    const getAvailableFilterOperationsComputed = (
      { getAvailableFilterOperations },
    ) => getAvailableFilterOperationsGetter(
      getAvailableFilterOperations,
      availableFilterOperations,
      columnNames,
    );

    return (
      <Plugin name="DataTypeProvider">
        <Getter name="getAvailableFilterOperations" computed={getAvailableFilterOperationsComputed} />
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
  availableFilterOperations: PropTypes.arrayOf(PropTypes.string),
};

DataTypeProvider.defaultProps = {
  formatterComponent: undefined,
  editorComponent: undefined,
  availableFilterOperations: undefined,
};
