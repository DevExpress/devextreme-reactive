import * as React from 'react';
import * as PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';

export class TableServiceCell extends React.Component {
  componentDidMount() {
    const { onMounted } = this.props;
    onMounted(() => {
      // eslint-disable-next-line react/no-find-dom-node
      const { left, right, width } = findDOMNode(this).getBoundingClientRect();
      return { left, right, width };
    });
  }

  render() {
    const { style } = this.props;
    return (
      <td
        style={{ ...style, padding: 0 }}
      />
    );
  }
}

TableServiceCell.propTypes = {
  onMounted: PropTypes.func.isRequired,
  style: PropTypes.object,
};

TableServiceCell.defaultProps = {
  style: null,
};
