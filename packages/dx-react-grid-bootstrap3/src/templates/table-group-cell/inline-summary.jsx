import * as React from 'react';
import PropTypes from 'prop-types';

export const InlineSummary = ({
  inlineSummaries, getMessage,
  inlineSummaryItemComponent: InlineSummaryItem,
  style, ...restProps
}) => (
  <span
    style={{
      marginLeft: '6px',
      ...style,
    }}
    {...restProps}
  >
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
  getMessage: PropTypes.func.isRequired,
  inlineSummaries: PropTypes.array,
  inlineSummaryItemComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  style: PropTypes.object,
};

InlineSummary.defaultProps = {
  inlineSummaries: [],
  style: null,
};
