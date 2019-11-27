import * as React from 'react';
import * as PropTypes from 'prop-types';
import PageLayout from './page-layout';

export default ({ children }) => (
  <PageLayout sectionName="demos">
    <div className="row">
      <div className="col-12">
        {children}
      </div>
    </div>
  </PageLayout>
);
