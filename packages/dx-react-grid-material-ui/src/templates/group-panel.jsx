import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { GroupPanelLayout } from '@devexpress/dx-react-grid';

export const styles = theme => ({
  panel: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
  },
  groupInfo: {
    padding: `${theme.spacing.unit * 0.75}px 0`,
    marginBottom: theme.spacing.unit * 1.5,
    display: 'inline-block',
    color: theme.typography.title.color,
  },
  groupIcon: {
    display: 'inline-block',
    verticalAlign: 'middle',
  },
});

const PanelBase = ({ classes, children }) => (
  <div className={classes.panel}>
    {children}
  </div>
);

PanelBase.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

const Panel = withStyles(styles, { name: 'GroupPanel' })(PanelBase);

const GroupPanelBase = ({ getMessage, classes, ...restProps }) => (
  <div className={classes.panel}>
    <GroupPanelLayout
      groupByColumnText={(
        <span className={classes.groupInfo}>
          {getMessage('groupByColumn')}
        </span>
      )}
      panelComponent={Panel}
      {...restProps}
    />
  </div>
);

GroupPanelBase.propTypes = {
  getMessage: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export const GroupPanel = withStyles(styles, { name: 'GroupPanel' })(GroupPanelBase);
