// BLOCK:imports
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
// BLOCK:imports

// BLOCK:body
const tooltipContentArgStyle = {
  paddingBottom: 0,
};
const tooltipContentValStyle = {
  paddingTop: 0,
};
const TooltipContentBase = ({
  title, arg, val, ...restProps
}) => (
  <div>
    <div>{title}</div>
    <div>
      <Tooltip.Content
        {...restProps}
        style={tooltipContentArgStyle}
        text={arg}
      />
    </div>
    <div>
      <Tooltip.Content
        {...restProps}
        style={tooltipContentValStyle}
        text={val}
      />
    </div>
  </div>
);

const ResetButton = withStyles(theme => ({
  button: {
    margin: theme.spacing.unit,
  },
}))(({ classes, ...props }) => (
  <Button variant="outlined" color="primary" className={classes.button} {...props}>Reset</Button>
));
// BLOCK:body
