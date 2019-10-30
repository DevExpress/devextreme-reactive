import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

export const InlineSummary = ({
  inlineSummaries, getMessage,
  inlineSummaryItemComponent: InlineSummaryItem,
  className, ...restProps
}) => (
  <span className={classNames('ml-2', className)} {...restProps}>
    {'('}
    {inlineSummaries.map(s => (
      <InlineSummaryItem
        key={s.type}
        summary={s}
        getMessage={getMessage}
      />
    ))
      .reduce((acc, summary) => acc.concat(summary, ', '), [])
      .slice(0, -1)}
    {')'}
  </span>
);

InlineSummary.propTypes = {
  className: PropTypes.string,
  getMessage: PropTypes.func.isRequired,
  inlineSummaries: PropTypes.array,
  inlineSummaryItemComponent: PropTypes.func.isRequired,
};

InlineSummary.defaultProps = {
  className: undefined,
  inlineSummaries: [],
};
