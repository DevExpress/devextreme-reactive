import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Plugin } from '@devexpress/dx-react-core';

const pluginDependencies = [
  { name: 'PagingState' },
];

export class CustomPaging extends React.PureComponent {
  render() {
    const { totalCount } = this.props;

    return (
      <Plugin
        name="CustomPaging"
        dependencies={pluginDependencies}
      >
        <Getter name="totalCount" value={totalCount} />
      </Plugin>
    );
  }
}

CustomPaging.propTypes = {
  totalCount: PropTypes.number,
};

CustomPaging.defaultProps = {
  totalCount: 0,
};
