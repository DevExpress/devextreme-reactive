import React from 'react';
import PropTypes from 'prop-types';
import { Getter, PluginContainer } from '@devexpress/dx-react-core';

const pluginDependencies = [
  { pluginName: 'PagingState' },
];

export class CustomPaging extends React.PureComponent {
  render() {
    const { totalCount } = this.props;

    return (
      <PluginContainer
        pluginName="CustomPaging"
        dependencies={pluginDependencies}
      >
        <Getter name="totalCount" value={totalCount} />
      </PluginContainer>
    );
  }
}

CustomPaging.propTypes = {
  totalCount: PropTypes.number,
};

CustomPaging.defaultProps = {
  totalCount: 0,
};
