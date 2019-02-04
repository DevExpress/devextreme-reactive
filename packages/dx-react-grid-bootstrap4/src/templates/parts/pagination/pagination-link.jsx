import * as React from 'react';
import PropTypes from 'prop-types';

export const PaginationLink = ({
  previous,
  next,
  children,
  ...restProps
}) => {
  let ariaLabel = '';
  let content = children;

  if (next || previous) {
    let angleQuote;
    if (next) {
      angleQuote = '\u00bb';
      ariaLabel = 'Next';
    }
    if (previous) {
      angleQuote = '\u00ab';
      ariaLabel = 'Previous';
    }

    content = [
      <span aria-hidden="true" key="caret">
        {children || angleQuote}
      </span>,
      <span className="sr-only" key="sr">
        {ariaLabel}
      </span>,
    ];
  }

  return (
    <a
      className="page-link"
      aria-label={ariaLabel}
      {...restProps}
    >
      {content}
    </a>
  );
};

PaginationLink.propTypes = {
  previous: PropTypes.bool,
  next: PropTypes.bool,
  children: PropTypes.node,
};

PaginationLink.defaultProps = {
  previous: false,
  next: false,
  children: undefined,
};
