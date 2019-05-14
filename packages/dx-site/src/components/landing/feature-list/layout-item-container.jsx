import * as React from 'react';

const LayoutItemContainer = ({ md, sm = md, xs = 12, children, className }) => (
  <div className={`${className} col-md-${md} col-sm-${sm} col-${xs}`}>
    {children}
  </div>
);

export default LayoutItemContainer;
