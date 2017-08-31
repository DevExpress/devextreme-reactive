import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List from 'material-ui-icons/List';
import { GroupPanelLayout } from '@devexpress/dx-react-grid';

const styles = theme => ({
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

const DefaultTextBase = ({ classes, allowDragging, allowUngroupingByClick }) => {
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

DefaultTextBase.propTypes = {
  classes: PropTypes.shape().isRequired,
  allowDragging: PropTypes.bool,
  allowUngroupingByClick: PropTypes.bool,
};

DefaultTextBase.defaultProps = {
  allowDragging: false,
  allowUngroupingByClick: false,
};

const DefaultText = withStyles(styles, { name: 'GroupPanel' })(DefaultTextBase);

const PanelTemplateBase = ({ classes, items }) => (
  <div className={classes.panel}>
    {items}
  </div>
);

PanelTemplateBase.propTypes = {
  classes: PropTypes.shape().isRequired,
  items: PropTypes.arrayOf(PropTypes.node).isRequired,
};

const PanelTemplate = withStyles(styles, { name: 'GroupPanel' })(PanelTemplateBase);

const panelTemplate = props => <PanelTemplate {...props} />;

const GroupPanelBase = ({ groupByColumnText, classes, ...restProps }) => {
  const text = groupByColumnText || (
    <DefaultText
      allowDragging={restProps.allowDragging}
      allowUngroupingByClick={restProps.allowUngroupingByClick}
    />);
  return (
    <div className={classes.panel}>
      <GroupPanelLayout
        groupByColumnText={text}
        panelTemplate={panelTemplate}
        {...restProps}
      />
    </div>
  );
};

GroupPanelBase.propTypes = {
  groupByColumnText: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

GroupPanelBase.defaultProps = {
  groupByColumnText: undefined,
};

export const GroupPanel = withStyles(styles, { name: 'GroupPanel' })(GroupPanelBase);
