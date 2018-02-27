import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Action, Plugin } from '@devexpress/dx-react-core';
import { toggleDetailRowExpanded } from '@devexpress/dx-grid-core';
import { createStateHelper } from '../utils/state-helper';

export class RowDetailState extends React.PureComponent {
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

    this.toggleDetailRowExpanded = stateHelper.applyFieldReducer
      .bind(stateHelper, 'expandedRowIds', toggleDetailRowExpanded);
  }
  componentWillReceiveProps(nextProps) {
    const {
      expandedRowIds = this.state.expandedRowIds,
    } = nextProps;
    this.setState({
      expandedRowIds,
    });
  }
  render() {
    const { expandedRowIds } = this.state;

    return (
      <Plugin
        name="RowDetailState"
      >
        <Getter name="expandedDetailRowIds" value={expandedRowIds} />
        <Action name="toggleDetailRowExpanded" action={this.toggleDetailRowExpanded} />
      </Plugin>
    );
  }
}

RowDetailState.propTypes = {
  expandedRowIds: PropTypes.array,
  defaultExpandedRowIds: PropTypes.array,
  onExpandedRowIdsChange: PropTypes.func,
};

RowDetailState.defaultProps = {
  expandedRowIds: undefined,
  defaultExpandedRowIds: [],
  onExpandedRowIdsChange: undefined,
};
