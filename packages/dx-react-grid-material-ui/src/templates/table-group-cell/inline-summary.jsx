import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  inlineSummary: {
    marginLeft: theme.spacing.unit,
    verticalAlign: 'middle',
  },
});

const InlineSummaryBase = ({
  inlineSummaries, getMessage,
  inlineSummaryItemComponent: InlineSummaryItem,
  classes, className, ...restProps
}) => (
  <span className={classNames(classes.inlineSummary, className)} {...restProps}>
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

InlineSummaryBase.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  getMessage: PropTypes.func.isRequired,
  inlineSummaries: PropTypes.array,
  inlineSummaryItemComponent: PropTypes.func.isRequired,
};

InlineSummaryBase.defaultProps = {
  className: undefined,
  inlineSummaries: [],
};

export const InlineSummary = withStyles(styles)(InlineSummaryBase);
