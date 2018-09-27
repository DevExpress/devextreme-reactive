import * as React from 'react';
import Helmet from 'react-helmet';
import Layout from '../../../components/layout';
import Header from '../../../components/header';
import MainLogo from '../../../components/logos/main';
import LandingHeaderAddon from '../../../components/landing/header-addon';
import LandingLayout from '../../../components/landing/layout';
import LandingTitle from '../../../components/landing/title';
import LandingHr from '../../../components/landing/hr';
import LandingIconFeature from '../../../components/landing/icon-feature';
import LandingImageFeature from '../../../components/landing/image-feature';
import LandingMaintainence from '../../../components/landing/maintainence';
import LandingLink from '../../../components/landing/link';
import LandingReadyToLearnMore from '../../../components/landing/ready-to-learn-more';

import headerLink from './images/header.png';
import bootstrapThemeLink from './images/bootstrap-theme.png';
import materialThemeLink from './images/material-theme.png';
import profilerLink from './images/profiler.png';
import virtualScrollingLink from './images/virtual-scrolling.png';
import sortingLink from './images/sorting.png';
import groupingLink from './images/grouping.png';

const IndexPage = () => (
  <Layout>
    <Helmet title="Vue Grid" />
    <Header
      logo={<MainLogo />}
      addon={(
        <LandingHeaderAddon
          main="Vue Grid"
          additional={(
            <React.Fragment>
              for Bootstrap
              <br />
              <br />
              <LandingLink to="/vue/grid/docs/">Getting Started</LandingLink>
              {' '}
              <LandingLink to="/vue/grid/demos/" type="vue">Demos</LandingLink>
            </React.Fragment>
          )}
          imageLink={headerLink}
        />
      )}
    />
    <LandingLayout>
      <LandingTitle
        text="Outstanding Performance"
      />
      <LandingImageFeature
        imageLink={profilerLink}
        title="100% Native Vue"
        description="We've focused our energy on performance and leveraged the best practice recomendations oferred by the Vue team. Through immutability and pure functions, we can apply memoization and built-in Vue optimisations to archieve outstanding performance."
      />
      <LandingImageFeature
        imageLink={virtualScrollingLink}
        title="Virtual Scrolling"
        description="Fully control Vue Grid state and treat it as a pure view component. Effortless enable state persistance and time-travelling without side effects. Our Vue Grid can also manage its state internally helping you write less code, so you focus on more important business tasks."
      />
      <LandingHr />
      <LandingTitle
        text="Wide Data Shaping Options"
      />
      <LandingImageFeature
        imageLink={sortingLink}
        title="Milti-column Sorting"
        description="We've focused our energy on performance and leveraged the best practice recomendations oferred by the Vue team. Through immutability and pure functions, we can apply memoization and built-in Vue optimisations to archieve outstanding performance."
      />
      <LandingImageFeature
        imageLink={groupingLink}
        title="Multi-column Grouping"
        description="Fully control Vue Grid state and treat it as a pure view component. Effortless enable state persistance and time-travelling without side effects. Our Vue Grid can also manage its state internally helping you write less code, so you focus on more important business tasks."
      />
      <LandingHr />
      <LandingTitle
        text="Native Rendering & Seamless Theming"
      />
      <LandingImageFeature
        imageLink={bootstrapThemeLink}
        title="Twitter Bootstrap Vue Grid"
        description="Use any existing or create your custom bootstrap theme. No need for any additional configuration."
      />
      <LandingImageFeature
        imageLink={materialThemeLink}
        title="Material Design Vue Grid"
        description="We ship additional Material-UI packages that allow you to utilize the familiar approaches and appearance."
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
        description="Every textual piece of our Vue components is customizable. Localize or globalize your Vue app with ease."
      />
      <LandingIconFeature
        title="Docs & Examples"
        description="Improve your productivity using our comprehensive and simple docs with live Vue demos and code examples."
      />
    </LandingLayout>
    <LandingMaintainence />
    <LandingReadyToLearnMore
      links={(
        <React.Fragment>
          <LandingLink to="/vue/grid/docs/">Getting Started</LandingLink>
          {' '}
          <LandingLink to="/vue/grid/demos/" type="vue">Demos</LandingLink>
        </React.Fragment>
      )}
    />
  </Layout>
);

export default IndexPage;
