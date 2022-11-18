import * as React from 'react';
import PropTypes from 'prop-types';
import PageLayout from './page-layout';

const DemoPageLayout = ({ children }) => (
  <PageLayout sectionName="demos">
    <div className="row">
      <div className="col-12">
        {children}
      </div>
    </div>
  </PageLayout>
);

DemoPageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DemoPageLayout;
