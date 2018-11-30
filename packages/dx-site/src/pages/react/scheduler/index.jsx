import * as React from 'react';
import Helmet from 'react-helmet';
import Layout from '../../../components/layout';
import Header from '../../../components/header';
import ProductLogo from '../../../components/logos/product';
import LandingHeaderAddon from '../../../components/landing/header-addon';
import LandingLayout from '../../../components/landing/layout';
import LandingMaintainence from '../../../components/landing/maintainence';
import LandingLink from '../../../components/landing/link';
import LandingReadyToLearnMore from '../../../components/landing/ready-to-learn-more';

const IndexPage = () => (
  <Layout>
    <Helmet title="React Scheduler" />
    <Header
      logo={<ProductLogo link="react/scheduler" />}
      addon={(
        <LandingHeaderAddon
          main="React Scheduler"
          additional={(
            <React.Fragment>
              for Material UI
              <br />
              <br />
              <LandingLink to="/react/scheduler/docs/">Getting Started</LandingLink>
              {' '}
              <LandingLink to="/react/scheduler/demos/" type="react">Demos</LandingLink>
            </React.Fragment>
          )}
        />
      )}
    />
    <LandingLayout />
    <LandingMaintainence />
    <LandingReadyToLearnMore
      links={(
        <React.Fragment>
          <LandingLink to="/react/scheduler/docs/">Getting Started</LandingLink>
          {' '}
          <LandingLink to="/react/scheduler/demos/" type="react">Demos</LandingLink>
        </React.Fragment>
      )}
    />
  </Layout>
);

export default IndexPage;
