/* globals document:true window:true */
import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export const BodyColorContext = React.createContext();

const getBodyColor = () => {
  const body = document.getElementsByTagName('body')[0];
  const { backgroundColor } = window.getComputedStyle(body);

  return backgroundColor;
};

export const Root = ({ children, className, ...restProps }) => (
  <div
    className={classNames('d-flex flex-column position-relative', className)}
    {...restProps}
  >
    <BodyColorContext.Provider value={getBodyColor()}>
      {children}
    </BodyColorContext.Provider>
  </div>
);

Root.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

Root.defaultProps = {
  className: undefined,
  children: undefined,
};
