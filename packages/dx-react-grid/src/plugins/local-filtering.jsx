import React from 'react';
import PropTypes from 'prop-types';
import { Getter, PluginContainer } from '@devexpress/dx-react-core';
import { filteredRows } from '@devexpress/dx-grid-core';

export class LocalFiltering extends React.PureComponent {
  render() {
    const { filterFn } = this.props;

    const rowsComputed = ({ rows, filters }) => filteredRows(rows, filters, filterFn);

    return (
      <PluginContainer>
        <Getter name="rows" computed={rowsComputed} />
      </PluginContainer>
    );
  }
}

LocalFiltering.propTypes = {
  filterFn: PropTypes.func,
};

LocalFiltering.defaultProps = {
  filterFn: undefined,
};

