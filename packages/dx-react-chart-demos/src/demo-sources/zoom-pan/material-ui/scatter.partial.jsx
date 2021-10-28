// BLOCK:imports
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
// BLOCK:imports

// BLOCK:body
const PREFIX = 'Demo';

const classes = {
  style: `${PREFIX}-style`,
};

const TooltipLabelCell = props => (
  <Typography {...props} sx={{ opacity: 0.6, pt: 0, pb: 0 }} />
);

const TooltipValueCell = props => (
  <Typography {...props} sx={{ pt: 0, pb: 0 }} />
);
const StyledHr = styled('hr')(({ theme }) => ({
  [`&.${classes.style}`]: {
    opacity: 0.6,
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
  },
}));
const TooltipSplitter = props => (
  <StyledHr className={classes.style} {...props} />
);
const StyledTypography = styled(Typography)(({ theme }) => ({
  [`&.${classes.style}`]: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: 500,
  },
}));
const TooltipHeader = props => (
  <StyledTypography className={classes.style} {...props} />
);

const ResetButton = props => (
  <Button variant="outlined" color="primary" sx={{ margin: 1 }} {...props}>Reset</Button>
);
// BLOCK:body
