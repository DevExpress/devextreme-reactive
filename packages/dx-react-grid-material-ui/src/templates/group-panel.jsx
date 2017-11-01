import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List from 'material-ui-icons/List';
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

const GroupPanelTextBase = ({
  classes,
  allowDragging,
  allowUngroupingByClick,
  getMessage,
}) => {
  const message = getMessage('groupByColumn');
  if (message) {
    return (
      <span className={classes.groupInfo}>
        {message}
      </span>
    );
  }
  if (allowDragging) {
    return (
      <span className={classes.groupInfo}>
        Drag a column header here to group by that column
      </span>
    );
  }
  if (allowUngroupingByClick) {
    return (
      <span className={classes.groupInfo}>
        Click
        &nbsp;
        <span className={classes.groupIcon}>
          <List />
        </span>
        &nbsp;
        icon in the column header to group by that column
      </span>
    );
  }
  return (
    <span className={classes.groupInfo}>
      Grouping is not available
    </span>
  );
};

GroupPanelTextBase.propTypes = {
  classes: PropTypes.object.isRequired,
  allowDragging: PropTypes.bool,
  allowUngroupingByClick: PropTypes.bool,
  getMessage: PropTypes.func.isRequired,
};

GroupPanelTextBase.defaultProps = {
  allowDragging: false,
  allowUngroupingByClick: false,
};

const GroupPanelText = withStyles(styles, { name: 'GroupPanel' })(GroupPanelTextBase);

const PanelTemplateBase = ({ classes, items }) => (
  <div className={classes.panel}>
    {items}
  </div>
);

PanelTemplateBase.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.arrayOf(PropTypes.node).isRequired,
};

const PanelTemplate = withStyles(styles, { name: 'GroupPanel' })(PanelTemplateBase);

const panelTemplate = props => <PanelTemplate {...props} />;

const GroupPanelBase = ({ getMessage, classes, ...restProps }) => {
  const groupPanelText = (
    <GroupPanelText
      allowDragging={restProps.allowDragging}
      allowUngroupingByClick={restProps.allowUngroupingByClick}
      getMessage={getMessage}
    />);
  return (
    <div className={classes.panel}>
      <GroupPanelLayout
        groupByColumnText={groupPanelText}
        panelTemplate={panelTemplate}
        {...restProps}
      />
    </div>
  );
};

GroupPanelBase.propTypes = {
  getMessage: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export const GroupPanel = withStyles(styles, { name: 'GroupPanel' })(GroupPanelBase);
