import * as React from 'react';
import Helmet from 'react-helmet';
import Layout from '../components/layouts/layout';
import Header from '../components/header';
import LandingHeaderAddon from '../components/landing/header-addon';
import LandingAlternatedBackground from '../components/landing/alternated-background';
import LandingLayout from '../components/landing/layout';
import WhyDevExtremeForReact from '../components/landing/why-devextreme-react';
import LandingChessBoardLayoutList from '../components/landing/features-list';
import LandingMaintainence from '../components/landing/maintainence';
import LandingProductLayout from '../components/landing/product-layout';
import LandingProductBlock from '../components/landing/product-block';
import LandingLink from '../components/landing/link';
import LandingProductLinks from '../components/landing/product-links';
import LandingProductFloatImage from '../components/landing/product-float-image';
import NotificationBox from '../components/docs/notification-box';
import Banner from '../components/banner';

import headerLink from './images/header.png';
import ReactGridIcon from './images/react-grid.inline.svg';
import ReactChartIcon from './images/react-chart.inline.svg';
import ReactSchedulerIcon from './images/react-scheduler.inline.svg';
import nativeReactImage from './images/reactive-100-react.png';
import lovesReduxImage from './images/reactive-love-redux.png';
import pluginBasedImage from './images/reactive-plugins.png';
import typeScriptImage from './images/reactive-type-script.png';
import localizationImage from './images/reactive-localization.png';
import docImage from './images/reactive-doc.png';
import bsImage from './images/bootstrap-theme.png';
import muiImage from './images/material-theme.png';

const pageData = [
  {
    title: '100% Pure React',
    description: 'We\'ve focused our energy on performance and best practices offered by the React team. Through immutability and pure React components, we apply ‘memoization’ and all built-in React optimizations to achieve outstanding performance.',
    imageLink: nativeReactImage,
  },
  {
    reversed: true,
    alternative: true,
    title: 'Loves Redux by Design',
    description: 'Fully control Reactive component state and treat it as a pure view component. Effortlessly enable state persistence and time-traveling without side-effects. To help you write less code, our components can also manage their state internally.',
    imageLink: lovesReduxImage,
  },
  {
    title: 'Plugin-based Architecture',
    description: 'DevExtreme Reactive Components are built of plugins. Add and deploy only those features you require or extend built-in functionality with your own (or third-party) custom plugins.',
    imageLink: pluginBasedImage,
  },
  {
    reversed: true,
    alternative: true,
    title: 'TypeScript Support',
    description: 'TypeScript is often the choice for enterprise-scale web applications. Our TypeScript definitions are autogenerated and are always complete and in sync with docs.',
    imageLink: typeScriptImage,
  },
  {
    title: 'Localization Capabilities',
    description: 'Each component text element is customizable. As such, web apps powered by DevExtreme Reactive can be easily localized/globalized.',
    imageLink: localizationImage,
  },
  {
    reversed: true,
    alternative: true,
    title: 'Easy-to-Follow Documentation and Samples',
    description: 'Each DevExtreme Reactive feature includes a complete API reference, a usage guide with code examples and live demos with code available on GitHub.',
    imageLink: docImage,
  },
  {
    sectionTitle: 'Native Support for the UI Library of Your Choice',
    title: 'Twitter Bootstrap React Components',
    description: 'Use an existing theme or create your own custom bootstrap theme. No need for any additional configuration.',
    imageLink: bsImage,
  },
  {
    title: 'Material Design React Components',
    description: 'DevExtreme Reactive leverages the look and feel of the highly popular Material-UI library for the best possible developer experience.',
    imageLink: muiImage,
  },
];

const IndexPage = () => (
  <Layout>
    <Helmet title="React Components" />
    <LandingAlternatedBackground>
      <Banner />
      <Header
        links={<LandingProductLinks />}
        addon={(
          <LandingHeaderAddon
            isIndexPage
            main={(
              <>
                Data-Centric
                <br />
                React Components
              </>
            )}
            additional="for Bootstrap and Material-UI"
          />
        )}
      />
      <LandingProductFloatImage imageLink={headerLink} isIndexPage />

      <LandingProductLayout
        position="header"
      >
        <LandingProductBlock
          condensed
          type="react"
          icon={ReactGridIcon}
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
          condensed
          type="react"
          icon={ReactChartIcon}
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
          condensed
          type="react"
          icon={ReactSchedulerIcon}
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

      <div className="py-4" />
      <NotificationBox />

      <div className="py-4" />
      <WhyDevExtremeForReact />

      <LandingChessBoardLayoutList data={pageData} />

      <div style={{ padding: '2em 0' }} />

    </LandingAlternatedBackground>
    <LandingLayout>
      <LandingMaintainence />
    </LandingLayout>

    <LandingProductLayout
      position="footer"
    >
      <LandingProductBlock
        type="react"
        icon={ReactGridIcon}
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
        icon={ReactChartIcon}
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
        icon={ReactSchedulerIcon}
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
