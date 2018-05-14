import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Getter, Action, Plugin, createStateHelper } from '@devexpress/dx-react-core';
import { toggleDetailRowExpanded } from '@devexpress/dx-grid-core';

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
