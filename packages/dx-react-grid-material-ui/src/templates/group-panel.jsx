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

const GroupPanelTextBase = ({
  texts,
  classes,
  allowDragging,
  allowUngroupingByClick,
}) => {
  if (allowDragging) {
    return (
      <span className={classes.groupInfo}>
        {texts.dragColumnHeaderText || 'Drag a column header here to group by that column'}
      </span>
    );
  }
  if (allowUngroupingByClick) {
    return texts.groupByColumnText
      ? (<span className={classes.groupInfo}>{texts.groupByColumnText}</span>)
      : (<span className={classes.groupInfo}>
            Click&nbsp; <span className={classes.groupIcon}><List /></span>
            &nbsp;icon in the column header to group by that column
      </span>);
  }
  return (
    <span className={classes.groupInfo}>
      {texts.groupingUnavailableText || 'Grouping is not available'}
    </span>
  );
};

GroupPanelTextBase.propTypes = {
  texts: PropTypes.shape({
    groupByColumnText: PropTypes.string,
    dragColumnHeaderText: PropTypes.string,
    groupingUnavailableText: PropTypes.string,
  }),
  classes: PropTypes.shape().isRequired,
  allowDragging: PropTypes.bool,
  allowUngroupingByClick: PropTypes.bool,
};

GroupPanelTextBase.defaultProps = {
  allowDragging: false,
  allowUngroupingByClick: false,
  texts: {},
};

const GroupPanelText = withStyles(styles, { name: 'GroupPanel' })(GroupPanelTextBase);

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

const GroupPanelBase = ({
  groupByColumnText,
  dragColumnHeaderText,
  groupingUnavailableText,
  classes,
  ...restProps
}) => {
  const groupPanelText = (
    <GroupPanelText
      allowDragging={restProps.allowDragging}
      allowUngroupingByClick={restProps.allowUngroupingByClick}
      texts={{
        groupByColumnText,
        dragColumnHeaderText,
        groupingUnavailableText,
      }}
    />);

  return (
    <div className={classes.panel}>
      <GroupPanelLayout
        groupPanelText={groupPanelText}
        panelTemplate={panelTemplate}
        {...restProps}
      />
    </div>
  );
};

GroupPanelBase.propTypes = {
  groupByColumnText: PropTypes.string,
  dragColumnHeaderText: PropTypes.string,
  groupingUnavailableText: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

GroupPanelBase.defaultProps = {
  groupByColumnText: undefined,
  dragColumnHeaderText: undefined,
  groupingUnavailableText: undefined,
};

export const GroupPanel = withStyles(styles, { name: 'GroupPanel' })(GroupPanelBase);
