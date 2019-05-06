import * as React from 'react';

const LayoutItemContainer = ({ colSize, children }) => (
  <div className={`col-md-${colSize} col-sm-${colSize}`}>
    {children}
  </div>
);

export default LayoutItemContainer;
