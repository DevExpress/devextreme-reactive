import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Getter, Action, Plugin, createStateHelper } from '@devexpress/dx-react-core';
import { toggleRowExpanded } from '@devexpress/dx-grid-core';

export class TreeDataState extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      expandedRowIds: props.expandedRowIds || props.defaultExpandedRowIds,
    };

    const stateHelper = createStateHelper(
      this,
      {
        expandedRowIds: () => this.props.onExpandedRowIdsChange,
      },
    );

    this.toggleRowExpanded = stateHelper.applyFieldReducer
      .bind(stateHelper, 'expandedRowIds', toggleRowExpanded);
  }
  componentWillReceiveProps(nextProps) {
    const {
      expandedRowIds,
    } = nextProps;
    this.setState({
      ...expandedRowIds !== undefined ? { expandedRowIds } : null,
    });
  }
  render() {
    const { expandedRowIds } = this.state;

    return (
      <Plugin
        name="TreeDataState"
      >
        <Getter name="expandedRowIds" value={expandedRowIds} /> {/* collision =( */}
        <Action name="toggleRowExpanded" action={this.toggleRowExpanded} />
      </Plugin>
    );
  }
}

TreeDataState.propTypes = {
  expandedRowIds: PropTypes.array,
  defaultExpandedRowIds: PropTypes.array,
  onExpandedRowIdsChange: PropTypes.func,
};

TreeDataState.defaultProps = {
  expandedRowIds: undefined,
  defaultExpandedRowIds: [],
  onExpandedRowIdsChange: undefined,
};
