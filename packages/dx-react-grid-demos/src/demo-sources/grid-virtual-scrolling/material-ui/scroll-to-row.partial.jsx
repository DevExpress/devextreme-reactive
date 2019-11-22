// BLOCK:imports
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import GridMUI from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
// BLOCK:imports

// BLOCK:body
const styles = ({ spacing }) => ({
  container: {
    width: 'fit-content',
  },
  textContainer: {
    marginLeft: spacing(1),
    width: '6em',
  },
  text: {
    paddingTop: spacing(1),
    paddingBottom: spacing(1),
  },
  button: {
    marginLeft: spacing(1),
    height: '2.5em',
  },
});

const IdScrollerBase = ({
  classes, id, setId, scrollToRow,
}) => (
  <GridMUI alignItems="center" container className={classes.container}>
    <Typography>Id: </Typography>
    <TextField
      value={id}
      onChange={e => setId(e.target.value)}
      variant="outlined"
      className={classes.textContainer}
      inputProps={{
        className: classes.text,
      }}
    />
    <Button onClick={() => scrollToRow(id)} variant="outlined" className={classes.button}>
      Go
    </Button>
  </GridMUI>
);
const IdScroller = withStyles(styles, { name: 'IdScroller' })(IdScrollerBase);

const ScrollPanel = props => (
  <Plugin name="EditPropsPanel">
    <Template name="toolbarContent">
      <IdScroller {...props} />
      <TemplatePlaceholder />
    </Template>
  </Plugin>
);
// BLOCK:body
