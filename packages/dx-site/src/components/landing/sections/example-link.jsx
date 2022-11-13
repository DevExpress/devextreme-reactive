import * as React from 'react';
import PropTypes from 'prop-types';
import GatsbyLink from 'gatsby-link';

import styles from './example-link.module.scss';

const ExampleLink = ({ title, path }) => (
  <div className={styles.link}>
    <GatsbyLink to={path}>{title}</GatsbyLink>
  </div>
);

ExampleLink.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default ExampleLink;
