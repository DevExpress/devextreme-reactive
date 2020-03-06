import * as React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import styles from './version-link.module.scss';

const VersionLink = () => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            version
          }
        }
      }
    `}
    render={data => (
      <a
        href={`https://github.com/DevExpress/devextreme-reactive/tree/master/CHANGELOG.md#${data.site.siteMetadata.version}`}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.versionLink}
      >
        <span className={styles.version}>
          Version
          {' '}
          {data.site.siteMetadata.version}
        </span>
      </a>
    )}
  />
);

export default VersionLink;
