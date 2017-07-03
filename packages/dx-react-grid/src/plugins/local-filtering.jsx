import React from 'react';
import PropTypes from 'prop-types';
import { Getter, PluginContainer } from '@devexpress/dx-react-core';
import { filteredRows } from '@devexpress/dx-grid-core';

export class LocalFiltering extends React.PureComponent {
  render() {
    const { filterFn } = this.props;

    return (
      <PluginContainer>
        <Getter
          name="rows"
          pureComputed={filteredRows}
          connectArgs={getter => [
            getter('rows'),
            getter('filters'),
            filterFn,
          ]}
        />
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

