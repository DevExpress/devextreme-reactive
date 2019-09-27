// BLOCK:imports
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import GridMUI from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
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
            labelWidth={0}
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
