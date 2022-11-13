import * as React from 'react';
import PropTypes from 'prop-types';
import '@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css';

const DemoContainer = ({ children }) => (
  <div>
    {children}
  </div>
);

DemoContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DemoContainer;
