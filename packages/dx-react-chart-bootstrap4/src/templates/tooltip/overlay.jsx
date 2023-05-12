import * as React from 'react';
import PropTypes from 'prop-types';
import { RIGHT, TOP } from '@devexpress/dx-chart-core';
import { Popover } from '../../../../dx-react-bootstrap4/components';

const popperModifiers = [
  {
    name: 'flip',
    enabled: false,
  },
  {
    name: 'preventOverflow',
    options: {
      altAxis: true,
    },
  },
];

export class Overlay extends React.PureComponent {
  render() {
    const {
      children, target, rotated, ...restProps
    } = this.props;
    return (
      <Popover
        placement={rotated ? RIGHT : TOP}
        isOpen
        target={target}
        modifiers={popperModifiers}
        {...restProps}
      >
        {children}
      </Popover>
    );
  }
}

Overlay.propTypes = {
  children: PropTypes.node.isRequired,
  target: PropTypes.any.isRequired,
  rotated: PropTypes.bool.isRequired,
  arrowComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};
