import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Getter, Action, Plugin, createStateHelper } from '@devexpress/dx-react-core';
import { toggleSelection } from '@devexpress/dx-grid-core';

export class SelectionState extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selection: props.selection || props.defaultSelection,
    };

    const stateHelper = createStateHelper(
      this,
      {
        selection: () => this.props.onSelectionChange,
      },
    );

    this.toggleSelection = stateHelper.applyFieldReducer
      .bind(stateHelper, 'selection', toggleSelection);
  }
  componentWillReceiveProps(nextProps) {
    const {
      selection,
    } = nextProps;
    this.setState({
      ...selection !== undefined ? { selection } : null,
    });
  }
  render() {
    const { selection } = this.state;

    return (
      <Plugin
        name="SelectionState"
      >
        <Getter name="selection" value={selection} />
        <Action name="toggleSelection" action={this.toggleSelection} />
      </Plugin>
    );
  }
}

SelectionState.propTypes = {
  selection: PropTypes.array,
  defaultSelection: PropTypes.array,
  onSelectionChange: PropTypes.func,
};

SelectionState.defaultProps = {
  selection: undefined,
  defaultSelection: [],
  onSelectionChange: undefined,
};
