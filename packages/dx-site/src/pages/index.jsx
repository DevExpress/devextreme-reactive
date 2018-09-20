import * as React from 'react';
import Layout from '../components/layout';
import Header from '../components/header';
import MainLogo from '../components/logos/main';
import LandingHeaderAddon from '../components/langing-header-addon';

import indexHeader from './index-header.png';
import featureIcon from './feature-icon.png';

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
              Reactive Components
            </React.Fragment>
          )}
          additional="for Bootstrap and Material Design"
          imageLink={indexHeader}
        />
      )}
    />
    <div className="container">
      Why DevExtreme Reactive?
      <div className="row">
        <div className="col-md-3">
          <img
            alt="Native Bootstrap Rendering"
            src={featureIcon}
          />
          <br />
          <b>Native Bootstrap Rendering</b>
          <br />
          DevExtreme Reactive components deeply integrate with Bootstrap 4 CSS framework.
          {' '}
          Take advantage of Bootstrap semantic rendering and apply Bootstrap themes automatically.
        </div>
      </div>
    </div>
  </Layout>
);

export default IndexPage;
