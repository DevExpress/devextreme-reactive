import * as React from 'react';
import Helmet from 'react-helmet';
import Layout from '../../../components/layout';
import Header from '../../../components/header';
import ProductLogo from '../../../components/logos/product';
import LandingHeaderAddon from '../../../components/landing/header-addon';
import LandingLayout from '../../../components/landing/layout';
import LandingTitle from '../../../components/landing/title';
import LandingIconFeature from '../../../components/landing/icon-feature';
import LandingImageFeature from '../../../components/landing/image-feature';
import LandingMaintainence from '../../../components/landing/maintainence';
import LandingLink from '../../../components/landing/link';
import LandingReadyToLearnMore from '../../../components/landing/ready-to-learn-more';

import LandingAlternatedBackground from '../../../components/landing/alternated-background';
import LandingChessBoardLayout from '../../../components/landing/chess-board-layout';
import LandingFeatureDescription from '../../../components/landing/feature-description';
import LandingFeaturePreview from '../../../components/landing/feature-preview';

import imageBoxLink from '../../images/image-box.png';

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
              for Bootstrap and Material-UI
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
    <LandingChessBoardLayout
      title="Outstanding Performance"
      firstChild={(
        <LandingFeatureDescription
          title="100% Native React"
          description="We've focused our energy on performance and leveraged the best practice recomendations oferred by the React team. Through immutability and pure functions, we can apply memoization and built-in react optimisations to archieve outstanding performance."
        />
        )}
      secondChild={(
        <LandingFeaturePreview
          title="100% Native React"
          imageLink={imageBoxLink}
        />
        )}
    />
    <LandingAlternatedBackground>
      <LandingChessBoardLayout
        reversed
        firstChild={(
          <LandingFeatureDescription
            title="Virtual Scrolling"
            description="Fully control React Grid state and treat it as a pure view component. Effortless enable state persistance and time-travelling without side effects. Our React Grid can also manage its state internally helping you write less code, so you focus on more important business tasks."
          />
          )}
        secondChild={(
          <LandingFeaturePreview
            title="Virtual Scrolling"
            imageLink={imageBoxLink}
          />
          )}
      />
    </LandingAlternatedBackground>
    <LandingChessBoardLayout
      title="Wide Data Shaping Options"
      firstChild={(
        <LandingFeatureDescription
          title="Milti-column Sorting"
          description="We've focused our energy on performance and leveraged the best practice recomendations oferred by the React team. Through immutability and pure functions, we can apply memoization and built-in React optimisations to archieve outstanding performance."
        />
        )}
      secondChild={(
        <LandingFeaturePreview
          title="Milti-column Sorting"
          imageLink={imageBoxLink}
        />
        )}
    />
    <LandingAlternatedBackground>
      <LandingChessBoardLayout
        reversed
        firstChild={(
          <LandingFeatureDescription
            title="Multi-column Grouping"
            description="Fully control React Grid state and treat it as a pure view component. Effortless enable state persistance and time-travelling without side effects. Our React Grid can also manage its state internally helping you write less code, so you focus on more important business tasks."
          />
          )}
        secondChild={(
          <LandingFeaturePreview
            title="Multi-column Grouping"
            imageLink={imageBoxLink}
          />
          )}
      />
    </LandingAlternatedBackground>
    <LandingChessBoardLayout
      title="Native Rendering & Seamless Theming"
      firstChild={(
        <LandingFeatureDescription
          title="Twitter Bootstrap React Grid"
          description="Use any existing or create your custom bootstrap theme. No need for any additional configuration."
        />
        )}
      secondChild={(
        <LandingFeaturePreview
          title="Twitter Bootstrap React Grid"
          imageLink={imageBoxLink}
        />
        )}
    />
    <LandingAlternatedBackground>
      <LandingChessBoardLayout
        reversed
        firstChild={(
          <LandingFeatureDescription
            title="Material Design React Grid"
            description="We ship additional Material-UI packages that allow you to utilize the familiar approaches and appearance."
          />
          )}
        secondChild={(
          <LandingFeaturePreview
            title="Material Design React Grid"
            imageLink={imageBoxLink}
          />
          )}
      />
    </LandingAlternatedBackground>
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
