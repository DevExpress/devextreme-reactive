import * as React from 'react';
import Layout from '../../../components/layout';
import Header from '../../../components/header';
import MainLogo from '../../../components/logos/main';
import LandingHeaderAddon from '../../../components/landing/header-addon';

import headerLink from './images/header.png';

const IndexPage = () => (
  <Layout>
    <Header
      logo={<MainLogo />}
      addon={(
        <LandingHeaderAddon
          main="React Chart"
          additional="for Bootstrap and Material UI"
          imageLink={headerLink}
        />
      )}
    />
  </Layout>
);

export default IndexPage;
