import * as React from 'react';
import Helmet from 'react-helmet';
import Layout from '../../../components/layout';
import Header from '../../../components/header';
import ProductLogo from '../../../components/logos/product';
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
    <Helmet title="React Grid" />
    <Header
      logo={<ProductLogo link="react/grid" />}
      addon={(
        <LandingHeaderAddon
          main="React Grid"
          additional={(
            <React.Fragment>
              for Bootstrap and Material UI
              <br />
              <br />
              <LandingLink
                to="/react/grid/docs/guides/getting-started/"
                variant="button"
                title="Getting Started"
              >
                Getting Started
              </LandingLink>
              {' '}
              <LandingLink
                to="/react/grid/demos/"
                type="react"
                variant="button"
                title="Demos"
              >
                Demos
              </LandingLink>
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
        title="100% Native React"
        description="We've focused our energy on performance and leveraged the best practice recomendations oferred by the React team. Through immutability and pure functions, we can apply memoization and built-in React optimisations to archieve outstanding performance."
      />
      <LandingImageFeature
        imageLink={virtualScrollingLink}
        title="Virtual Scrolling"
        description="Fully control React Grid state and treat it as a pure view component. Effortless enable state persistance and time-travelling without side effects. Our React Grid can also manage its state internally helping you write less code, so you focus on more important business tasks."
      />
      <LandingHr />
      <LandingTitle
        text="Wide Data Shaping Options"
      />
      <LandingImageFeature
        imageLink={sortingLink}
        title="Milti-column Sorting"
        description="We've focused our energy on performance and leveraged the best practice recomendations oferred by the React team. Through immutability and pure functions, we can apply memoization and built-in React optimisations to archieve outstanding performance."
      />
      <LandingImageFeature
        imageLink={groupingLink}
        title="Multi-column Grouping"
        description="Fully control React Grid state and treat it as a pure view component. Effortless enable state persistance and time-travelling without side effects. Our React Grid can also manage its state internally helping you write less code, so you focus on more important business tasks."
      />
      <LandingHr />
      <LandingTitle
        text="Native Rendering & Seamless Theming"
      />
      <LandingImageFeature
        imageLink={bootstrapThemeLink}
        title="Twitter Bootstrap React Grid"
        description="Use any existing or create your custom bootstrap theme. No need for any additional configuration."
      />
      <LandingImageFeature
        imageLink={materialThemeLink}
        title="Material Design React Grid"
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
        description="Every textual piece of our React components is customizable. Localize or globalize your React app with ease."
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
    <LandingReadyToLearnMore
      links={(
        <React.Fragment>
          <LandingLink
            to="/react/grid/docs/guides/getting-started/"
            variant="button"
            title="Getting Started"
          >
            Getting Started
          </LandingLink>
          {' '}
          <LandingLink
            to="/react/grid/demos/"
            type="react"
            variant="button"
            title="Demos"
          >
            Demos
          </LandingLink>
        </React.Fragment>
      )}
    />
  </Layout>
);

export default IndexPage;
