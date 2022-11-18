import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';
import { styled } from '@mui/material/styles';

const PREFIX = 'InlineSummary';
export const classes = {
  inlineSummary: `${PREFIX}-inlineSummary`,
};
const StyledSpan = styled('span')(({ theme }) => ({
  [`&.${classes.inlineSummary}`]: {
    marginLeft: theme.spacing(1),
    verticalAlign: 'middle',
  },
}));

export const InlineSummary = ({
  inlineSummaries, getMessage,
  inlineSummaryItemComponent: InlineSummaryItem,
  className, ...restProps
}) => (
  <StyledSpan className={classNames(classes.inlineSummary, className)} {...restProps}>
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
  </StyledSpan>
);

InlineSummary.propTypes = {
  className: PropTypes.string,
  getMessage: PropTypes.func.isRequired,
  inlineSummaries: PropTypes.array,
  inlineSummaryItemComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

InlineSummary.defaultProps = {
  className: undefined,
  inlineSummaries: [],
};
