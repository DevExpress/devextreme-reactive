import React from 'react';
import PropTypes from 'prop-types';
import { GroupPanelLayout } from '@devexpress/dx-react-grid';

const Panel = ({ children }) => <div>{children}</div>;

Panel.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export const GroupPanel = ({ getMessage, ...restProps }) => (
  <GroupPanelLayout
    groupByColumnText={(
      <div
        style={{
          padding: '7px 0',
          marginBottom: '5px',
        }}
      >
        {getMessage('groupByColumn')}
      </div>
    )}
    panelComponent={Panel}
    {...restProps}
  />
);

GroupPanel.propTypes = {
  getMessage: PropTypes.func.isRequired,
};
