import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Action, PluginContainer } from '@devexpress/dx-react-core';
import { orderedColumns, setColumnOrder } from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { pluginName: 'TableView' },
];

export class TableColumnReordering extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      order: props.defaultOrder,
    };

    this._setColumnOrder = (order, { sourceColumnName, targetColumnName }) => {
      const { onOrderChange } = this.props;
      const nextOrder = setColumnOrder(order, { sourceColumnName, targetColumnName });
      this.setState({ order: nextOrder });
      if (onOrderChange) {
        onOrderChange(nextOrder);
      }
    };
  }
  render() {
    const {
      order = this.state.order,
    } = this.props;

    const columnsComputed = ({ tableColumns }) => orderedColumns(tableColumns, order);

    return (
      <PluginContainer
        pluginName="TableColumnReordering"
        dependencies={pluginDependencies}
      >
        <Getter name="tableColumns" computed={columnsComputed} />
        <Action
          name="setColumnOrder"
          action={({ sourceColumnName, targetColumnName }) =>
            this._setColumnOrder(order, { sourceColumnName, targetColumnName })
          }
        />
      </PluginContainer>
    );
  }
}

TableColumnReordering.propTypes = {
  order: PropTypes.arrayOf(PropTypes.string),
  defaultOrder: PropTypes.arrayOf(PropTypes.string),
  onOrderChange: PropTypes.func,
};

TableColumnReordering.defaultProps = {
  order: undefined,
  defaultOrder: undefined,
  onOrderChange: undefined,
};
