import * as React from 'react';
import Layout from '../../components/layout';
import Header from '../../components/header';
import MainLogo from '../../components/logos/main';
import LandingHeaderAddon from '../../components/langing-header-addon';

import indexHeader from './index-header.png';

const IndexPage = () => (
  <Layout>
    <Header
      logo={<MainLogo />}
      addon={(
        <LandingHeaderAddon
          main={(
            <React.Fragment>
              Data-Centric
              <br />
              React Components
            </React.Fragment>
          )}
          additional="for Bootstrap and Material UI"
          imageLink={indexHeader}
        />
      )}
    />
  </Layout>
);

export default IndexPage;
