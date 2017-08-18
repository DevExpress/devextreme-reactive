import React from 'react';
import PropTypes from 'prop-types';

import { GroupPanelLayout } from '@devexpress/dx-react-grid';

const defaultText = (
  <span
    style={{
      padding: '7px 0',
      marginBottom: '5px',
      display: 'inline-block',
    }}
  >
    Drag a column header here to group by that column
  </span>
);

const PanelTemplate = ({ items }) => <div>{items}</div>;

PanelTemplate.propTypes = {
  items: PropTypes.arrayOf(PropTypes.node).isRequired,
};

const panelTemplate = props => <PanelTemplate {...props} />;

export const GroupPanel = ({ groupByColumnText, ...restProps }) => (
  <GroupPanelLayout
    groupByColumnText={groupByColumnText || defaultText}
    panelTemplate={panelTemplate}
    {...restProps}
  />
);

GroupPanel.propTypes = {
  groupByColumnText: PropTypes.string,
};

GroupPanel.defaultProps = {
  groupByColumnText: undefined,
};
