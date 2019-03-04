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
    sectionTitle: 'Outstanding Performance',
    title: '100% Native React',
    description: 'We\'ve focused our energy on performance and leveraged the best practice recomendations oferred by the React team. Through immutability and pure functions, we can apply memoization and built-in react optimisations to archieve outstanding performance.',
    imageLink: imageBoxLink,
  },
  {
    reversed: true,
    title: 'Virtual Scrolling',
    description: 'Fully control React Grid state and treat it as a pure view component. Effortless enable state persistance and time-travelling without side effects. Our React Grid can also manage its state internally helping you write less code, so you focus on more important business tasks.',
    imageLink: imageBoxLink,
  },
  {
    alternative: true,
    sectionTitle: 'Wide Data Shaping Options',
    title: 'Milti-column Sorting',
    description: 'We\'ve focused our energy on performance and leveraged the best practice recomendations oferred by the React team. Through immutability and pure functions, we can apply memoization and built-in React optimisations to archieve outstanding performance.',
    imageLink: imageBoxLink,
  },
  {
    reversed: true,
    title: 'Multi-column Grouping',
    description: 'Fully control React Grid state and treat it as a pure view component. Effortless enable state persistance and time-travelling without side effects. Our React Grid can also manage its state internally helping you write less code, so you focus on more important business tasks.',
    imageLink: imageBoxLink,
  },
];

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
    <LandingChessBoardLayoutList data={pageData} />
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
