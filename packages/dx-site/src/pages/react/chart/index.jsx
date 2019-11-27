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
import imageBoxLink from '../../images/image-box.png';
import smallImageBoxLink from '../../images/image-box-small.png';
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
import LandingIconFeature from '../../../components/landing/icon-feature';
import LandingLayout from '../../../components/landing/layout';
import LandingTitle from '../../../components/landing/title';
import LandingImageFeature from '../../../components/landing/image-feature';
import LandingProductFloatImage from '../../../components/landing/product-float-image';
import bootstrapThemeLink from './images/bootstrap-theme.png';
import materialThemeLink from './images/material-theme.png';
import AlternatedBackground from '../../../components/landing/alternated-background';

const chartTypes = [
  {
    sectionTitle: '5 Built-in Chart Types With Customizable Series',
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
    sectionTitle: 'Interactivity At Your Full Control',
    title: 'Series/Point Selection',
    description: 'React Chart supports both programmatic and interactive series/point selection. The selected elements can be automatically highlighted and the associated data is exposed to your application for use. The both single and multiple selection are supported.',
    imageLink: seriesSelectionImage,
    guideLink: '/react/chart/docs/guides/hover-and-selection/#selection',
  },
  {
    alternative: true,
    title: 'Series/Point Hover & Event Tracking',
    description: 'Hover Tracking allows you to know which series or point is hovered and reflect this information in your application UI. For instance, you can show a point details in a separate or popup form. You can also track and handle other series/point mouse/touch events.',
    imageLink: seriesHoverImage,
    guideLink: '/react/chart/docs/guides/hover-and-selection/#hover-in-uncontrolled-mode',
  },
  {
    reversed: true,
    title: 'Zooming and Scrolling',
    description: 'End-users can effeciently analyse long point series using the React Chart zooming and scrolling capabilities. We support instant zooming using mouse wheel or zoom gestures and zoom to a square region. Horizontal scrolling/panning is also available.',
    imageLink: zoomingScrollingImage,
    guideLink: '/react/chart/docs/guides/zoom-and-pan/',
  },
  {
    alternative: true,
    sectionTitle: 'Wide Customization Capabilities',
    title: 'Customize Chart via HTML/CSS',
    description: 'The React Chart uses a hybrid rendering mechanism that combines HTML and SVG. This means that you can use HTML and CSS to influence layout and appearance of chart building blocks such as title and legend.',
    imageLink: customizeHTMLImage,
    guideLink:'/react/chart/demos/bar/component-customization/',
  },
  {
    reversed: true,
    title: 'Enhance Charts Using D3',
    description: 'You can use the existing D3 modules to apply different kinds of custom chart behavior or data visualization. Explore our online React Chart demos and learn how we utilize the d3-scale, d3-shape, d3-format and other D3 modules.',
    imageLink: enhanceD3Image,
    guideLink: '/react/chart/demos/area/streamgraph/',
  },
  {
    alternative: true,
    title: 'Customize Chart Rendering',
    description: 'The React Chart UI plugins allow you to use custom React components to render particular pieces of the React Chart UI in a custom way. All you need is to pass your custom components to the required plugins via their props.',
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
            <React.Fragment>
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
            </React.Fragment>
          )}
        />
      )}
    />
    <LandingProductFloatImage imageLink={headerLink} />
    <AlternatedBackground style={{ paddingTop: '4rem', paddingBottom: '2rem' }}>
      <LandingChessBoardSmallLayoutList data={chartTypes} />
      <LandingChessBoardLayoutList data={pageData} columns={3} />
    </AlternatedBackground>
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

    <AlternatedBackground>
      <LandingLayout>
        <LandingThingsThatMatter />
      </LandingLayout>
    </AlternatedBackground>

    <LandingMaintainence />
    <LandingReadyToLearnMore
      links={(
        <React.Fragment>
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
        </React.Fragment>
      )}
    />
  </Layout>
);

export default IndexPage;
