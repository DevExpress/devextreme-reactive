import React from 'react';
import PropTypes from 'prop-types';

import { GroupPanelLayout } from '@devexpress/dx-react-grid';

const defaultText = (
  <span style={{ marginBottom: '5px', display: 'inline-block' }}>
    Click
    &nbsp;
    <i
      className="glyphicon glyphicon-th-list"
      style={{
        top: '0',
        fontSize: '9px',
      }}
    />
    &nbsp;
    icon in the column header to group by that column
  </span>
);

const PanelTemplate = ({ cells }) => <div>{cells}</div>;

PanelTemplate.propTypes = {
  cells: PropTypes.arrayOf(PropTypes.node).isRequired,
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
