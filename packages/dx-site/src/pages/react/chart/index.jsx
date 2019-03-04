import * as React from 'react';
import Helmet from 'react-helmet';
import Layout from '../../../components/layout';
import Header from '../../../components/header';
import ProductLogo from '../../../components/logos/product';
import LandingHeaderAddon from '../../../components/landing/header-addon';
import LandingMaintainence from '../../../components/landing/maintainence';
import LandingLink from '../../../components/landing/link';
import LandingReadyToLearnMore from '../../../components/landing/ready-to-learn-more';
import LandingChessBoardLayoutList from '../../../components/landing/chess-board-layout-list';
import imageBoxLink from '../../images/image-box.png';
import headerLink from './images/header.png';

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
    title: 'React Pie Chart',
    description: 'Description....',
    imageLink: imageBoxLink,
  },
  {
    alternative: true,
    sectionTitle: 'Unlimited Chart Customization',
    title: 'HTML/CSS Layout Customization',
    description: 'Description....',
    imageLink: imageBoxLink,
  },
  {
    reversed: true,
    title: 'D3 Compatible',
    description: 'Description....',
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
    <LandingChessBoardLayoutList data={pageData} />
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
