import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Action, PluginContainer } from '@devexpress/dx-react-core';
import { orderedColumns, setColumnOrder } from '@devexpress/dx-grid-core';

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

    const columnsComputed = ({ columns }) => orderedColumns(columns, order);

    return (
      <PluginContainer
        pluginName="TableColumnReordering"
      >
        <Getter name="columns" computed={columnsComputed} />
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
