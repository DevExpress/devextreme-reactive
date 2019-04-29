import * as React from 'react';
import Helmet from 'react-helmet';
import Layout from '../../../components/layout';
import Header from '../../../components/header';
import ProductLogo from '../../../components/logos/product';
import LandingHeaderAddon from '../../../components/landing/header-addon';
import LandingMaintainence from '../../../components/landing/maintainence';
import LandingLink from '../../../components/landing/link';
import LandingReadyToLearnMore from '../../../components/landing/ready-to-learn-more';
import LandingChessBoardLayoutList from '../../../components/landing/features-list';
import imageBoxLink from '../../images/image-box.png';
import headerLink from './images/header.png';

import LandingLayout from '../../../components/landing/layout';
import LandingTitle from '../../../components/landing/title';
import LandingImageFeature from '../../../components/landing/image-feature';
import bootstrapThemeLink from './images/bootstrap-theme.png';
import materialThemeLink from './images/material-theme.png';

const pageData = [
  {
    alternative: true,
    sectionTitle: '10 Built-in Series Types',
    title: 'React Bar Chart',
    description: 'Description....',
    imageLink: imageBoxLink,
  },
  {
    reversed: true,
    sectionTitle: 'Interactivity At Your Full Control',
    title: 'Series/Point Selection',
    description: 'React Chart supports both programmatic and interactive series/point selection. The selected elements can be automatically highlighted and the associated data is exposed to your application for use. The both single and multiple selection are supported.',
    imageLink: imageBoxLink,
  },
  {
    alternative: true,
    title: 'Series/Point Hover & Event Tracking',
    description: 'Hover Tracking allows you to know which series or point is hovered and reflect this information in your application UI. For instance, you can show a point details in a separate or popup form. You can also track and handle other series/point mouse/touch events.',
    imageLink: imageBoxLink,
  },
  {
    reversed: true,
    title: 'Zooming and Scrolling',
    description: 'End-users can effeciently analyse long point series using the React Chart zooming and scrolling capabilities. We support instant zooming using mouse wheel or zoom gestures and zoom to a square region. Horizontal scrolling/panning is also available.',
    imageLink: imageBoxLink,
  },
  {
    alternative: true,
    sectionTitle: 'Wide Customization Capabilities',
    title: 'Customize Chart via HTML/CSS',
    description: 'The React Chart uses a hybrid rendering mechanism that combines HTML and SVG. This means that you can use HTML and CSS to influence layout and appearance of chart building blocks such as title and legend.',
    imageLink: imageBoxLink,
  },
  {
    reversed: true,
    title: 'Customize Chart Rendering',
    description: 'The React Chart UI plugins allow you to use custom React components to render particular pieces of the React Chart UI in a custom way. All you need is to pass your custom components to the required plugins via their props.',
    imageLink: imageBoxLink,
  },
  {
    alternative: true,
    title: 'Customize Chart via HTML/CSS',
    description: 'The React Chart uses a hybrid rendering mechanism that combines HTML and SVG. This means that you can use HTML and CSS to influence layout and appearance of chart building blocks such as title and legend.',
    imageLink: imageBoxLink,
  },
];

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
              for Bootstrap and Material-UI
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
    <LandingChessBoardLayoutList data={pageData} colSize={6} />
    <LandingLayout>
      <LandingTitle text="Native Support for the UI Library of Your Choice" />
      <LandingImageFeature
        imageLink={bootstrapThemeLink}
        title="Twitter Bootstrap Rendering"
        description="Use any existing or create your custom bootstrap theme. No need for any additional configuration."
      />
      <LandingImageFeature
        imageLink={materialThemeLink}
        title="Material Design Rendering"
        description="We ship additional Material-UI packages that allow you to utilize the familiar approaches and appearance."
      />
    </LandingLayout>
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
