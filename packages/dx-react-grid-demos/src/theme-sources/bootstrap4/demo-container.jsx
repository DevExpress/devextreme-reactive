import * as React from 'react';
import * as PropTypes from 'prop-types';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';

const DemoContainer = ({ children }) => (
  <div>
    {children}
  </div>
);

DemoContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DemoContainer;
