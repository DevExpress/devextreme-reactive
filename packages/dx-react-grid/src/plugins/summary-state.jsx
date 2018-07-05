import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Getter, Plugin } from '@devexpress/dx-react-core';

export class SummaryState extends React.PureComponent {
  render() {
    const { totalItems, groupItems, treeItems } = this.props;

    return (
      <Plugin
        name="SummaryState"
      >
        <Getter name="totalSummaryItems" value={totalItems} />
        <Getter name="groupSummaryItems" value={groupItems} />
        <Getter name="treeSummaryItems" value={treeItems} />
      </Plugin>
    );
  }
}

SummaryState.propTypes = {
  totalItems: PropTypes.array,
  groupItems: PropTypes.array,
  treeItems: PropTypes.array,
};

SummaryState.defaultProps = {
  totalItems: undefined,
  groupItems: undefined,
  treeItems: undefined,
};
