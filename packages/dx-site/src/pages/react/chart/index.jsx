import * as React from 'react';
import Helmet from 'react-helmet';
import Layout from '../../../components/layouts/layout';
import Header from '../../../components/header';
import LandingHeaderAddon from '../../../components/landing/header-addon';
import LandingMaintainence from '../../../components/landing/maintainence';
import LandingLink from '../../../components/landing/link';
import LandingProductLinks from '../../../components/landing/product-links';
import LandingReadyToLearnMore from '../../../components/landing/ready-to-learn-more';
import LandingChessBoardLayoutList from '../../../components/landing/features-list';
import LandingChessBoardSmallLayoutList from '../../../components/landing/features-list-small';
import headerLink from './images/header.png';
import barImage from './images/series/Bar.svg';
import lineImage from './images/series/Line.svg';
import splineImage from './images/series/Spline.svg';
import areaImage from './images/series/Area.svg';
import scatterImage from './images/series/Scatter.svg';
import stackedBarImage from './images/series/Stacked-Bar.svg';
import stackedLineImage from './images/series/Stacked-Line.svg';
import stackedSplineImage from './images/series/Stacked-Spline.svg';
import stackedAreaImage from './images/series/Stacked-Area.svg';
import pieImage from './images/series/Pie.svg';
import seriesSelectionImage from './images/Series-Selection.png';
import seriesHoverImage from './images/Series-Hover.png';
import zoomingScrollingImage from './images/Zooming-and-Scrolling.png';
import customizeHTMLImage from './images/Customize-Chart-HTML.png';
import enhanceD3Image from './images/Enhance-Charts-D3.png';
import customizeRenderingImage from './images/Customize-Chart-Rendering.png';

import LandingThingsThatMatter from '../../../components/landing/things-that-matter';
import ButtonLinksContainer from '../../../components/landing/button-links-container';
import LandingLayout from '../../../components/landing/layout';
import LandingTitle from '../../../components/landing/title';
import LandingImageFeature from '../../../components/landing/image-feature';
import LandingProductFloatImage from '../../../components/landing/product-float-image';
import bootstrapThemeLink from './images/bootstrap-theme.png';
import materialThemeLink from './images/material-theme.png';
import AlternatedBackground from '../../../components/landing/alternated-background';
import NotificationBox from '../../../components/docs/notification-box';

const chartTypes = [
  {
    sectionTitle: '5 Built-in Chart Types with Customizable Series',
    title: 'Bar Chart',
    imageLink: barImage,
    guideLink: '/react/chart/demos/bar/simple-bar/',
  },
  {
    title: 'Line Chart',
    imageLink: lineImage,
    guideLink: '/react/chart/demos/line/line/',
  },
  {
    title: 'Spline Chart',
    imageLink: splineImage,
    guideLink: '/react/chart/demos/line/spline/',
  },
  {
    title: 'Area Chart',
    imageLink: areaImage,
    guideLink: '/react/chart/demos/area/simple-area/',
  },
  {
    title: 'Scatter Chart',
    imageLink: scatterImage,
    guideLink: '/react/chart/demos/point/scatter/',
  },
  {
    title: 'Stacked Bar Chart',
    imageLink: stackedBarImage,
    guideLink: '/react/chart/demos/bar/stacked-bar/',
  },
  {
    title: 'Stacked Line Chart',
    imageLink: stackedLineImage,
    guideLink: '/react/chart/demos/line/simple-bar/',
  },
  {
    title: 'Stacked Spline Chart',
    imageLink: stackedSplineImage,
    guideLink: '/react/chart/demos/line/spline/',
  },
  {
    title: 'Stacked Area Chart',
    imageLink: stackedAreaImage,
    guideLink: '/react/chart/demos/area/stacked-area/',
  },
  {
    title: 'Pie Chart',
    imageLink: pieImage,
    guideLink: '/react/chart/demos/pie/pie/',
  },
];
const pageData = [
  {
    reversed: true,
    sectionTitle: 'Interactivity at Your Fingertips',
    title: 'Series/Point Selection',
    description: 'Our React Chart supports both programmatic and interactive series/point selection. Selected elements can be automatically highlighted, and associated data is exposed to your application for use. Both single and multiple selection are available.',
    imageLink: seriesSelectionImage,
    guideLink: '/react/chart/docs/guides/hover-and-selection/#selection',
  },
  {
    alternative: true,
    title: 'Series/Point Hover & Event Tracking',
    description: 'Deliver dynamic data visualizations with real-time UI updates based upon user interactions within the Chart. Our React Chart API allows you to track the hover state of Chart UI elements such as series and points.',
    imageLink: seriesHoverImage,
    guideLink: '/react/chart/docs/guides/hover-and-selection/#hover-in-uncontrolled-mode',
  },
  {
    reversed: true,
    title: 'Zooming and Scrolling',
    description: 'End-users can quickly analyze data by zooming/scrolling its contents.  We support instant zoom via the mouse wheel or zoom gestures and zoom to a square region. Horizontal scrolling/panning is also available.',
    imageLink: zoomingScrollingImage,
    guideLink: '/react/chart/docs/guides/zoom-and-pan/',
  },
  {
    alternative: true,
    sectionTitle: 'Wide Customization Capabilities',
    title: 'Customize Chart via HTML/CSS',
    description: 'Our React Chart uses a hybrid rendering mechanism that combines HTML and SVG. You can use both HTML and CSS to easily manipulate the layout and appearance of chart building blocks such as title and legend.',
    imageLink: customizeHTMLImage,
    guideLink: '/react/chart/demos/bar/component-customization/',
  },
  {
    reversed: true,
    title: 'Enhance Charts Using D3',
    description: 'You can use existing D3 modules to apply custom chart behaviors or visualizations. Explore our online React Chart demos and learn how we utilize d3-scale, d3-shape, d3-format and other D3 modules.',
    imageLink: enhanceD3Image,
    guideLink: '/react/chart/demos/area/streamgraph/',
  },
  {
    alternative: true,
    title: 'Customize Chart Rendering',
    description: 'Our React Chart UI plugins allow you to use custom React components to custom render desired portions of the React Chart’s user interface. To do so, simpley pass your custom components to the required plugins via their props.',
    imageLink: customizeRenderingImage,
    guideLink: '/react/chart/demos/combination/multiple-axes/',
  },
];

const IndexPage = () => (
  <Layout>
    <Helmet title="React Chart" />
    <Header
      page="productPage"
      links={(
        <LandingProductLinks />
      )}
      addon={(
        <LandingHeaderAddon
          main="React Chart"
          additional={(
            <>
              for Bootstrap and Material-UI
              <ButtonLinksContainer>
                <LandingLink
                  to="/react/chart/docs/guides/getting-started/"
                  variant="button"
                  title="Getting Started"
                  fixedWidth
                >
                  Getting Started
                </LandingLink>
                {' '}
                <LandingLink
                  to="/react/chart/demos/"
                  type="react"
                  variant="button"
                  title="Demos"
                  fixedWidth
                >
                  Demos
                </LandingLink>
              </ButtonLinksContainer>
            </>
          )}
        />
      )}
    />
    <LandingProductFloatImage imageLink={headerLink} />
    <AlternatedBackground>
      <NotificationBox style={{ paddingTop: '40px' }} />
      <LandingChessBoardSmallLayoutList data={chartTypes} />
      <LandingChessBoardLayoutList data={pageData} columns={3} />
    </AlternatedBackground>
    <LandingLayout style={{ paddingTop: '2em', paddingBottom: '2em' }}>
      <LandingTitle text="Native Support for the UI Library of Your Choice" />
      <LandingImageFeature
        imageLink={bootstrapThemeLink}
        title="Twitter Bootstrap React Chart"
        description="Use any existing theme or create a custom bootstrap theme as necessary. No need for any additional configuration."
      />
      <LandingImageFeature
        imageLink={materialThemeLink}
        title="Material-UI React Chart"
        description="Leverage both the user and developer experience of the Material-UI library."
      />
    </LandingLayout>

    <AlternatedBackground>
      <LandingLayout>
        <LandingThingsThatMatter />
      </LandingLayout>
    </AlternatedBackground>

    <LandingMaintainence />
    <LandingReadyToLearnMore
      links={(
        <>
          <LandingLink
            to="/react/chart/docs/guides/getting-started/"
            variant="button"
            title="Getting Started"
            fixedWidth
            condensed
          >
            Getting Started
          </LandingLink>
          {' '}
          <LandingLink
            to="/react/chart/demos/"
            type="react"
            variant="button"
            title="Demos"
            fixedWidth
            condensed
          >
            Demos
          </LandingLink>
        </>
      )}
    />
  </Layout>
);

export default IndexPage;
