import * as React from 'react';
import Helmet from 'react-helmet';
import Layout from '../../components/layout';
import Header from '../../components/header';
import MainLogo from '../../components/logos/main';
import LandingHeaderAddon from '../../components/landing/header-addon';
import LandingLayout from '../../components/landing/layout';
import LandingTitle from '../../components/landing/title';
import LandingHr from '../../components/landing/hr';
import LandingIconFeature from '../../components/landing/icon-feature';
import LandingImageFeature from '../../components/landing/image-feature';
import LandingMaintainence from '../../components/landing/maintainence';
import LandingProductLayout from '../../components/landing/product-layout';
import LandingProductBlock from '../../components/landing/product-block';
import LandingLink from '../../components/landing/link';

import headerLink from './images/header.png';
import featureIcon from './images/feature-icon.png';
import bootstrapThemeLink from './images/bootstrap-theme.png';

const IndexPage = () => (
  <Layout>
    <Helmet title="Vue Components" />
    <Header
      logo={<MainLogo />}
      addon={(
        <LandingHeaderAddon
          main={(
            <React.Fragment>
              Data-Centric
              <br />
              Vue Components
            </React.Fragment>
          )}
          additional="for Bootstrap"
          imageLink={headerLink}
        />
      )}
    />
    <LandingProductLayout
      position="header"
    >
      <LandingProductBlock
        type="vue"
        iconLink={featureIcon}
        title="Vue Grid"
        links={<LandingLink to="/vue/grid/">Explore Component</LandingLink>}
      />
    </LandingProductLayout>
    <LandingLayout>
      <LandingTitle
        text="Why DevExtreme for Vue?"
      />
      <LandingIconFeature
        iconLink={featureIcon}
        title="100% Native Vue"
        description="We've focused our energy on performance and leveraged the best practice recomendations oferred by the Vue team. Through immutability and pure functions, we can apply memoization and built-in react optimisations to archieve outstanding performance."
      />
      <LandingIconFeature
        iconLink={featureIcon}
        title="Plugin-based Architecture"
        description="DevExtreme Reactive Components are build of plugins. Add and deploy only the features you need or extend the build-in functionality with your or third-party custom plugins."
      />
      <LandingHr />
      <LandingTitle
        text="Native Rendering & Seamless Theming"
      />
      <LandingImageFeature
        imageLink={bootstrapThemeLink}
        title="Twitter Bootstrap Vue Components"
        description="Use any existing or create your custom bootstrap theme. No need for any additional configuration."
      />
      <LandingHr />
      <LandingTitle
        text="And Things That Also Matter..."
      />
      <LandingIconFeature
        title="Customization"
        description="Wide customization and extensibility capabilities. From template Vue components to custom plugins."
      />
      <LandingIconFeature
        title="Localization"
        description="Every textual piece of our Vue components is customizable. Localize or globalize your react app with ease."
      />
      <LandingIconFeature
        title="Docs & Examples"
        description="Improve your productivity using our comprehensive and simple docs with live Vue demos and code examples."
      />
    </LandingLayout>
    <LandingMaintainence />
    <LandingProductLayout
      position="footer"
    >
      <LandingProductBlock
        type="vue"
        iconLink={featureIcon}
        title="Vue Grid"
        links={<LandingLink to="/vue/grid/">Learn More</LandingLink>}
      />
    </LandingProductLayout>
  </Layout>
);

export default IndexPage;
