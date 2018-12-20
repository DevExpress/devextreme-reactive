import * as React from 'react';
import Helmet from 'react-helmet';
import Layout from '../components/layout';
import Header from '../components/header';
import ProductLogo from '../components/logos/product';
import LandingHeaderAddon from '../components/landing/header-addon';
import LandingLayout from '../components/landing/layout';
import LandingTitle from '../components/landing/title';
import LandingHr from '../components/landing/hr';
import LandingIconFeature from '../components/landing/icon-feature';
import LandingImageFeature from '../components/landing/image-feature';
import LandingMaintainence from '../components/landing/maintainence';
import LandingProductLayout from '../components/landing/product-layout';
import LandingProductBlock from '../components/landing/product-block';
import LandingLink from '../components/landing/link';

import headerLink from './images/header.png';
import featureIcon from './images/feature-icon.png';
import bootstrapThemeLink from './react/images/bootstrap-theme.png';
import materialThemeLink from './react/images/material-theme.png';

const IndexPage = () => (
  <Layout>
    <Helmet title="React Components" />
    <Header
      logo={<ProductLogo link="react" />}
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
          imageLink={headerLink}
        />
      )}
    />
    <LandingProductLayout
      position="header"
    >
      <LandingProductBlock
        type="react"
        iconLink={featureIcon}
        title={'React\nGrid'}
        links={[
          <LandingLink
            to="/react/grid/"
            variant="button"
            title="Explore Component"
            key="react-grid-header"
          >
            Explore Component
          </LandingLink>,
          <LandingLink
            to="/react/grid/demos/"
            title="Grid Demos"
            key="react-grid-demos-header"
          >
            Demos
          </LandingLink>,
        ]}
      />
      <LandingProductBlock
        type="react"
        iconLink={featureIcon}
        title={'React\nChart'}
        links={[
          <LandingLink
            to="/react/chart/"
            variant="button"
            title="Explore Component"
            key="react-chart-header"
          >
            Explore Component
          </LandingLink>,
          <LandingLink
            to="/react/chart/demos/"
            title="Chart Demos"
            key="react-chart-demos-header"
          >
            Demos
          </LandingLink>,
        ]}
      />
      <LandingProductBlock
        type="react"
        iconLink={featureIcon}
        title={'React\nScheduler'}
        links={[
          <LandingLink
            to="/react/scheduler/"
            variant="button"
            title="Explore Component"
            key="react-scheduler-header"
          >
            Explore Component
          </LandingLink>,
          <LandingLink
            to="/react/scheduler/demos/"
            title="Scheduler Demos"
            key="react-scheduler-demos-header"
          >
            Demos
          </LandingLink>,
        ]}
      />
    </LandingProductLayout>
    <LandingLayout>
      <LandingTitle
        text="Why DevExtreme for React?"
      />
      <LandingImageFeature
        iconLink={featureIcon}
        title="100% Native React"
        description="We've focused our energy on performance and leveraged the best practice recomendations oferred by the React team. Through immutability and pure functions, we can apply memoization and built-in react optimisations to archieve outstanding performance."
      />
      <LandingImageFeature
        title="Loves Redux by Design"
        iconLink={featureIcon}
        description="Fully control React Grid state and treat it as a pure view component. Effortlessly enable state persistence and time-traveling without side-effects. Our React Grid can also manage its state internally helping you write less code, so you focus on more important business tasks."
      />
      <LandingHr />
      <LandingTitle
        text="Native Rendering & Seamless Theming"
      />
      <LandingImageFeature
        imageLink={bootstrapThemeLink}
        title="Twitter Bootstrap React Components"
        description="Use any existing or create your custom bootstrap theme. No need for any additional configuration."
      />
      <LandingImageFeature
        imageLink={materialThemeLink}
        title="Material Design React Components"
        description="We ship additional Material-UI packages that allow you to utilize the familiar approaches and appearance."
      />
      <LandingHr />
      <LandingTitle
        text="And Things That Also Matter..."
      />
      <LandingIconFeature
        title="Customization"
        description="Wide customization and extensibility capabilities. From template React components to custom plugins."
      />
      <LandingIconFeature
        title="Localization"
        description="Every textual piece of our React components is customizable. Localize or globalize your react app with ease."
      />
      <LandingIconFeature
        title="TypeScript"
        description="Create easy-to-maintain and bug-free React applications with our autogenerated TypeScript definitions."
      />
      <LandingIconFeature
        title="Docs & Examples"
        description="Improve your productivity using our comprehensive and simple docs with live React demos and code examples."
      />
    </LandingLayout>
    <LandingMaintainence />
    <LandingProductLayout
      position="footer"
    >
      <LandingProductBlock
        type="react"
        iconLink={featureIcon}
        title={'React\nGrid'}
        links={[
          <LandingLink
            to="/react/grid/docs/guides/getting-started/"
            variant="button"
            title="Getting Started"
          >
            Getting Started
          </LandingLink>,
          <LandingLink
            to="/react/grid/demos/"
            title="Grid Demos"
            key="react-grid-demos-footer"
          >
            Demos
          </LandingLink>,
        ]}
      />
      <LandingProductBlock
        type="react"
        iconLink={featureIcon}
        title={'React\nChart'}
        links={[
          <LandingLink
            to="/react/chart/docs/guides/getting-started/"
            variant="button"
            title="Getting Started"
          >
            Getting Started
          </LandingLink>,
          <LandingLink
            to="/react/chart/demos/"
            title="Chart Demos"
            key="react-chart-demos-footer"
          >
            Demos
          </LandingLink>,
        ]}
      />
      <LandingProductBlock
        type="react"
        iconLink={featureIcon}
        title={'React\nScheduler'}
        links={[
          <LandingLink to="/react/scheduler/docs/guides/getting-started/" variant="button" title="Getting Started">Getting Started</LandingLink>,
          <LandingLink
            to="/react/scheduler/demos/"
            title="Scheduler Demos"
            key="react-scheduler-demos-footer"
          >
            Demos
          </LandingLink>,
        ]}
      />
    </LandingProductLayout>
  </Layout>
);

export default IndexPage;
