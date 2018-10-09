import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import moment from 'moment';

const styles = {
  title: {
    flex: 1,
    textAlign: 'center',
  },
};

const TitleBase = ({
  classes,
  className,
  currentDate,
  ...restProps
}) => (
  <Typography
    variant="title"
    color="inherit"
    className={classNames({
      [classes.title]: true,
    }, className)}
    {...restProps}
  >
    {moment(currentDate).format('MMMM YYYY')}
  </Typography>
);

TitleBase.propTypes = {
  classes: PropTypes.object.isRequired,
  currentDate: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]).isRequired,
  className: PropTypes.string,
};

TitleBase.defaultProps = {
  className: undefined,
};

export const Title = withStyles(styles, { name: 'Title' })(TitleBase);
