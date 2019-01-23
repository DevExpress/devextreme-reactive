import * as React from 'react';
import Helmet from 'react-helmet';
import Layout from '../components/layout';
import Header from '../components/header';
import ProductLogo from '../components/logos/product';
import LandingHeaderAddon from '../components/landing/header-addon';
import LandingContentWrapper from '../components/landing/content-wrapper';
import LandingLayout from '../components/landing/layout';
import LandingTitle from '../components/landing/title';
import LandingImageFeature from '../components/landing/image-feature';
import LandingFeaturePreview from '../components/landing/feature-preview';
import LandingFeatureDescription from '../components/landing/feature-description';
import LandingMaintainence from '../components/landing/maintainence';
import LandingProductLayout from '../components/landing/product-layout';
import LandingProductBlock from '../components/landing/product-block';
import LandingLink from '../components/landing/link';

import headerLink from './images/header.png';
import bootstrapLogo from './images/bootstrap-logo.svg';
import materialUiLogo from './images/material-ui-logo.svg';
import reactGridIcon from './images/react-grid.svg';
import reactChartIcon from './images/react-chart.svg';
import reactSchedulerIcon from './images/react-scheduler.svg';
import imageBoxLink from './images/image-box.png';

const IndexPage = () => (
  <Layout>
    <Helmet title="React Components" />
    <LandingContentWrapper highlighted>
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
            additional="for Bootstrap and Material Design"
            imageLink={headerLink}
          />
        )}
      />
      <LandingProductLayout
        position="header"
      >
        <LandingProductBlock
          type="react"
          iconLink={reactGridIcon}
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
          iconLink={reactChartIcon}
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
          iconLink={reactSchedulerIcon}
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
    </LandingContentWrapper>
    <LandingContentWrapper highlighted>
      <LandingLayout>
        <LandingTitle
          text="Why DevExtreme for React?"
        />
        <LandingImageFeature
          iconLink={bootstrapLogo}
          title="Twitter Bootstrap React Components"
          description="Use any existing or create your custom bootstrap theme. No need for any additional configuration."
        />
        <LandingImageFeature
          title="Material Design React Components"
          iconLink={materialUiLogo}
          description="We ship additional Material-UI packages that allow you to utilize the familiar approaches and appearance."
        />
      </LandingLayout>
    </LandingContentWrapper>


    <LandingContentWrapper flex withContainer>
      <LandingFeatureDescription
        title="100% Native React"
        description="We've focused our energy on performance and leveraged the best practice recomendations oferred by the React team. Through immutability and pure functions, we can apply memoization and built-in react optimisations to archieve outstanding performance."
      />
      <LandingFeaturePreview
        title="100% Native React"
        imageLink={imageBoxLink}
      />
    </LandingContentWrapper>

    <LandingContentWrapper flex highlighted leftImage withContainer>
      <LandingFeatureDescription
        title="Loves Redux by Design"
        description="Fully control React Grid state and treat it as a pure view component. Effortlessly enable state persistence and time-traveling without side-effects. Our React Grid can also manage its state internally helping you write less code, so you focus on more important business tasks."
      />
      <LandingFeaturePreview
        title="Loves Redux by Design"
        imageLink={imageBoxLink}
      />
    </LandingContentWrapper>

    <LandingContentWrapper flex withContainer>
      <LandingFeatureDescription
        title="Plugin-based Architecture"
        description="DevExtreme Reactive Components are built of plugins. Add and deploy only the features you need or extend the built-in functionality with your or third-party custom plugins."
      />
      <LandingFeaturePreview
        title="Plugin-based Architecture"
        imageLink={imageBoxLink}
      />
    </LandingContentWrapper>

    <LandingContentWrapper flex highlighted leftImage withContainer>
      <LandingFeatureDescription
        title="TypeScript Support"
        description="DevExtreme Reactive Components are built of plugins. Add and deploy only the features you need or extend the built-in functionality with your or third-party custom plugins."
      />
      <LandingFeaturePreview
        title="TypeScript Support"
        imageLink={imageBoxLink}
      />
    </LandingContentWrapper>

    <LandingContentWrapper flex withContainer>
      <LandingFeatureDescription
        title="Localization Capabilities"
        description="Every text element of the components UI is customizable. So, it's ready for localization or globalization if you need it in your app."
      />
      <LandingFeaturePreview
        title="Localization Capabilities"
        imageLink={imageBoxLink}
      />
    </LandingContentWrapper>

    <LandingContentWrapper flex highlighted leftImage withContainer>
      <LandingFeatureDescription
        title="Simple Docs with Live Examples"
        description="Every component feature has a complete API reference and a usage guide with code examples and live demos with sources available on GitHub."
      />
      <LandingFeaturePreview
        title="Simple Docs with Live Examples"
        imageLink={imageBoxLink}
      />
    </LandingContentWrapper>

    <LandingMaintainence />
    <LandingProductLayout
      position="footer"
    >
      <LandingProductBlock
        type="react"
        iconLink={reactGridIcon}
        title={'React\nGrid'}
        links={[
          <LandingLink
            to="/react/grid/docs/guides/getting-started/"
            variant="button"
            title="Getting Started"
            key="react-grid-footer"
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
        iconLink={reactChartIcon}
        title={'React\nChart'}
        links={[
          <LandingLink
            to="/react/chart/docs/guides/getting-started/"
            variant="button"
            title="Getting Started"
            key="react-chart-footer"
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
        iconLink={reactSchedulerIcon}
        title={'React\nScheduler'}
        links={[
          <LandingLink
            to="/react/scheduler/docs/guides/getting-started/"
            variant="button"
            title="Getting Started"
            key="react-scheduler-footer"
          >
            Getting Started
          </LandingLink>,
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
