import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Getter, Plugin } from '@devexpress/dx-react-core';

const pluginDependencies = [
  { name: 'SummaryState' },
];

export class CustomSummary extends React.PureComponent {
  render() {
    const { totalValues, groupValues, treeValues } = this.props;

    return (
      <Plugin
        name="CustomSummary"
        dependencies={pluginDependencies}
      >
        <Getter name="totalSummaryValues" value={totalValues} />
        <Getter name="groupSummaryValues" value={groupValues} />
        <Getter name="treeSummaryValues" value={treeValues} />
      </Plugin>
    );
  }
}

CustomSummary.propTypes = {
  totalValues: PropTypes.array,
  groupValues: PropTypes.object,
  treeValues: PropTypes.object,
};

CustomSummary.defaultProps = {
  totalValues: undefined,
  groupValues: undefined,
  treeValues: undefined,
};
