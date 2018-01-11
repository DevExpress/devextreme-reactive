import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Dropdown } from 'react-bootstrap';

export const Container = ({
  children,
  className,
  style,
  ...restProps
}) => (
  <Dropdown.Menu
    // className={classNames('list-group', className)}
    // style={{ marginBottom: 0, ...style }}
    // {...restProps}
  >
    {children}
  </Dropdown.Menu>
);

Container.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

Container.defaultProps = {
  className: undefined,
  style: undefined,
};
