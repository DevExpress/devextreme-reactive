import * as React from 'react';
import Helmet from 'react-helmet';
import Layout from '../../../components/layout';
import Header from '../../../components/header';
import ProductLogo from '../../../components/logos/product';
import LandingHeaderAddon from '../../../components/landing/header-addon';
import LandingChessBoardLayoutList from '../../../components/landing/chess-board-layout-list';
import LandingMaintainence from '../../../components/landing/maintainence';
import LandingLink from '../../../components/landing/link';
import LandingReadyToLearnMore from '../../../components/landing/ready-to-learn-more';
import imageBoxLink from '../../images/image-box.png';

const pageData = [
  {
    alternative: true,
    sectionTitle: 'Supported Features',
    title: 'Different Appointment Types',
    description: 'Description....',
    imageLink: imageBoxLink,
  },
  {
    reversed: true,
    title: 'Editing',
    description: 'Description....',
    imageLink: imageBoxLink,
  },
];

const IndexPage = () => (
  <Layout>
    <Helmet title="React Scheduler" />
    <Header
      logo={<ProductLogo link="react/scheduler" />}
      addon={(
        <LandingHeaderAddon
          main="React Scheduler"
          additional={(
            <React.Fragment>
              for Material-UI
              <br />
              <br />
              <LandingLink
                to="/react/scheduler/docs/guides/getting-started/"
                variant="button"
                title="Getting Started"
              >
                Getting Started
              </LandingLink>
              {' '}
              <LandingLink
                to="/react/scheduler/demos/"
                type="react"
                variant="button"
                title="Demos"
              >
                Demos
              </LandingLink>
            </React.Fragment>
          )}
        />
      )}
    />
    <LandingChessBoardLayoutList data={pageData} />
    <LandingMaintainence />
    <LandingReadyToLearnMore
      links={(
        <React.Fragment>
          <LandingLink
            to="/react/scheduler/docs/guides/getting-started/"
            variant="button"
            title="Getting Started"
          >
            Getting Started
          </LandingLink>
          {' '}
          <LandingLink
            to="/react/scheduler/demos/"
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
