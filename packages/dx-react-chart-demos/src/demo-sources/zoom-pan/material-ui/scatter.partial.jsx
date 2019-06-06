// BLOCK:imports
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
// BLOCK:imports

// BLOCK:body
const tooltipLabelCellStyle = {
  style: {
    opacity: 0.6,
    paddingTop: 0,
    paddingBottom: 0,
  },
};
const TooltipLabelCell = withStyles(tooltipLabelCellStyle)(({ classes, className, ...props }) => (
  <Typography className={classnames(classes.style, className)} {...props} />
));
const tooltipValueCellStyle = {
  style: {
    paddingTop: 0,
    paddingBottom: 0,
  },
};
const TooltipValueCell = withStyles(tooltipValueCellStyle)(({ classes, className, ...props }) => (
  <Typography className={classnames(classes.style, className)} {...props} />
));
const tooltipSplitterStyle = theme => ({
  style: {
    opacity: 0.6,
    marginTop: theme.spacing.unit * 0.5,
    marginBottom: theme.spacing.unit * 0.5,
  },
});
const TooltipSplitter = withStyles(tooltipSplitterStyle)(({ classes, className, ...props }) => (
  <hr className={classnames(classes.style, className)} {...props} />
));
const tooltipHeaderStyle = theme => ({
  style: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: 500,
  },
});
const TooltipHeader = withStyles(tooltipHeaderStyle)(({ classes, className, ...props }) => (
  <Typography className={classnames(classes.style, className)} {...props} />
));

const ResetButton = withStyles(theme => ({
  button: {
    margin: theme.spacing.unit,
  },
}))(({ classes, ...props }) => (
  <Button variant="outlined" color="primary" className={classes.button} {...props}>Reset</Button>
));
// BLOCK:body
