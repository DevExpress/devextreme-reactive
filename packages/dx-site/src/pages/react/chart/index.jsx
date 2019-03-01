import * as React from 'react';
import Helmet from 'react-helmet';
import Layout from '../../../components/layout';
import Header from '../../../components/header';
import ProductLogo from '../../../components/logos/product';
import LandingHeaderAddon from '../../../components/landing/header-addon';
import LandingMaintainence from '../../../components/landing/maintainence';
import LandingLink from '../../../components/landing/link';
import LandingReadyToLearnMore from '../../../components/landing/ready-to-learn-more';
import LandingAlternatedBackground from '../../../components/landing/alternated-background';
import LandingChessBoardLayout from '../../../components/landing/chess-board-layout';
import LandingFeatureDescription from '../../../components/landing/feature-description';
import LandingFeaturePreview from '../../../components/landing/feature-preview';
import imageBoxLink from '../../images/image-box.png';
import headerLink from './images/header.png';

const IndexPage = () => (
  <Layout>
    <Helmet title="React Chart" />
    <Header
      logo={<ProductLogo link="react/chart" />}
      addon={(
        <LandingHeaderAddon
          main="React Chart"
          additional={(
            <React.Fragment>
              for Bootstrap and Material Design
              <br />
              <br />
              <LandingLink
                to="/react/chart/docs/guides/getting-started/"
                variant="button"
                title="Getting Started"
              >
                Getting Started
              </LandingLink>
              {' '}
              <LandingLink
                to="/react/chart/demos/"
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
      title="10 Built-in Series Types"
      firstChild={(
        <LandingFeatureDescription
          title="React Bar Chart"
          description="Description...."
        />
        )}
      secondChild={(
        <LandingFeaturePreview
          title="React Bar Chart"
          imageLink={imageBoxLink}
        />
        )}
    />
    <LandingAlternatedBackground>
      <LandingChessBoardLayout
        reversed
        firstChild={(
          <LandingFeatureDescription
            title="React Pie Chart"
            description="Description...."
          />
          )}
        secondChild={(
          <LandingFeaturePreview
            title="React Pie Chart"
            imageLink={imageBoxLink}
          />
          )}
      />
    </LandingAlternatedBackground>
    <LandingChessBoardLayout
      title="Unlimited Chart Customization"
      firstChild={(
        <LandingFeatureDescription
          title="HTML/CSS Layout Customization"
          description="Description...."
        />
        )}
      secondChild={(
        <LandingFeaturePreview
          title="HTML/CSS Layout Customization"
          imageLink={imageBoxLink}
        />
        )}
    />
    <LandingAlternatedBackground>
      <LandingChessBoardLayout
        reversed
        firstChild={(
          <LandingFeatureDescription
            title="D3 Compatible"
            description="Description...."
          />
          )}
        secondChild={(
          <LandingFeaturePreview
            title="D3 Compatible"
            imageLink={imageBoxLink}
          />
          )}
      />
    </LandingAlternatedBackground>
    <LandingChessBoardLayout
      title="Hibrid Rendering & Seamless Theming"
      firstChild={(
        <LandingFeatureDescription
          title="Twitter Bootstrap React Chart"
          description="Use any existing or create your custom Bootstrap theme. No need for any additional configuration."
        />
        )}
      secondChild={(
        <LandingFeaturePreview
          title="Twitter Bootstrap React Chart"
          imageLink={imageBoxLink}
        />
        )}
    />
    <LandingAlternatedBackground>
      <LandingChessBoardLayout
        reversed
        firstChild={(
          <LandingFeatureDescription
            title="Material Design React Chart"
            description="We ship additional Material-UI packages that allow you to utilize the familiar approaches and appearance."
          />
          )}
        secondChild={(
          <LandingFeaturePreview
            title="Material Design React Chart"
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
            to="/react/chart/docs/guides/getting-started/"
            variant="button"
            title="Getting Started"
          >
            Getting Started
          </LandingLink>
          {' '}
          <LandingLink
            to="/react/chart/demos/"
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
