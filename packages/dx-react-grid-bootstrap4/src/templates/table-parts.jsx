import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';

import { BodyColorContext } from './layout';

export const TableHead = ({
  isFixed, className, style, ...restProps
}) => {
  const backgroundColor = React.useContext(BodyColorContext);
  return (
    <thead
      className={classNames({
        'dx-g-bs4-fixed-header': isFixed,
        'dx-g-bs4-table-sticky': isFixed,
      }, className)}
      style={{
        ...(isFixed && { backgroundColor }),
        ...style,
      }}
      {...restProps}
    />
  );
};
TableHead.propTypes = {
  className: PropTypes.string,
  isFixed: PropTypes.bool,
  style: PropTypes.object,
};

TableHead.defaultProps = {
  isFixed: undefined,
  style: undefined,
  className: undefined,
};

export const TableBody = ({ isFixed, ...restProps }) => <tbody {...restProps} />;
TableBody.propTypes = {
  isFixed: PropTypes.bool,
};

TableBody.defaultProps = {
  isFixed: undefined,
};

export const TableFooter = ({
  isFixed, ...restProps
}) => {
  const backgroundColor = React.useContext(BodyColorContext);
  return (
    <tfoot
      className={classNames({
        'dx-g-bs4-fixed-footer': isFixed,
        'dx-g-bs4-table-sticky': isFixed,
      })}
      style={{
        ...(isFixed && { backgroundColor }),
      }}
      {...restProps}
    />
  );
};

TableFooter.propTypes = {
  isFixed: PropTypes.bool,
};

TableFooter.defaultProps = {
  isFixed: undefined,
};
