// BLOCK:imports
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import GridMUI from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import withStyles from '@mui/styles/withStyles';
// BLOCK:imports

// BLOCK:body
const styles = () => ({
  input: {
    fontSize: '14px',
    width: '90px',
  },
  label: {
    fontSize: '14px',
  },
  container: {
    maxWidth: '18em',
  },
  selector: {
    height: '32px',
  },
});

// #FOLD_BLOCK
const StartEditActionSelectorBase = (props) => {
  const { defaultAction, changeAction, classes } = props;
  return (
    <GridMUI
      container
      alignItems="center"
      className={classes.container}
    >
      <Typography
        className={classes.label}
      >
        Start Edit Action:
        &nbsp;
      </Typography>
      <Select
        onChange={e => changeAction(e.target.value)}
        value={defaultAction}
        className={classes.selector}
        input={(
          <OutlinedInput
            classes={{ input: classes.input }}
            // labelWidth={0}
            margin="dense"
          />
        )}
      >
        <MenuItem value="click">Click</MenuItem>
        <MenuItem value="doubleClick">Double Click</MenuItem>
      </Select>
    </GridMUI>
  );
};
const StartEditActionSelector = withStyles(styles, { name: 'StartEditActionSelector' })(StartEditActionSelectorBase);

// #FOLD_BLOCK
const SelectTextCheckerBase = (props) => {
  const { isSelectText, changeSelectText, classes } = props;
  return (
    <FormControlLabel
      control={(
        <Checkbox
          checked={isSelectText}
          onChange={e => changeSelectText(e.target.checked)}
          color="primary"
        />
      )}
      classes={{ label: classes.label }}
      label="Select Text On Focus"
    />
  );
};
const SelectTextChecker = withStyles(styles, { name: 'SelectTextChecker' })(SelectTextCheckerBase);

const EditPropsPanel = props => (
  <Plugin name="EditPropsPanel">
    <Template name="toolbarContent">
      <SelectTextChecker {...props} />
      <TemplatePlaceholder />
      <StartEditActionSelector {...props} />
    </Template>
  </Plugin>
);
// BLOCK:body
