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

const IndexScrollerBase = ({
  classes, topIndex, setTopIndex, goToIndex,
}) => (
  <GridMUI alignItems="center" container className={classes.container}>
    <Typography>Index: </Typography>
    <TextField
      type="number"
      value={topIndex}
      onChange={e => setTopIndex(e.target.value)}
      variant="outlined"
      className={classes.textContainer}
      inputProps={{
        className: classes.text,
      }}
    />
    <Button onClick={goToIndex} variant="outlined" className={classes.button}>
      Go
    </Button>
  </GridMUI>
);
const IndexScroller = withStyles(styles, { name: 'IndexScroller' })(IndexScrollerBase);

const IdScrollerBase = ({
  classes, topId, setTopId, goToId,
}) => (
  <GridMUI alignItems="center" container className={classes.container}>
    <Typography>Id: </Typography>
    <TextField
      value={topId}
      onChange={e => setTopId(e.target.value)}
      variant="outlined"
      className={classes.textContainer}
      inputProps={{
        className: classes.text,
      }}
    />
    <Button onClick={goToId} variant="outlined" className={classes.button}>
      Go
    </Button>
  </GridMUI>
);
const IdScroller = withStyles(styles, { name: 'IdScroller' })(IdScrollerBase);

const ScrollPanel = props => (
  <Plugin name="EditPropsPanel">
    <Template name="toolbarContent">
      <IndexScroller {...props} />
      <TemplatePlaceholder />
      <IdScroller {...props} />
    </Template>
  </Plugin>
);
// BLOCK:body
