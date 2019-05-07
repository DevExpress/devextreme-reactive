import * as React from 'react';

const LayoutItemContainer = ({ md, sm = md, children, className }) => (
  <div className={`${className} col-md-${md} col-sm-${sm}`}>
    {children}
  </div>
);

export default LayoutItemContainer;
