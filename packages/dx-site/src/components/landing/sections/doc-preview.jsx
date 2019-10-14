import * as React from 'react';
import GatsbyLink from 'gatsby-link';

import styles from './doc-preview.module.scss';

const DocPreview = ({ title, path, imageLink, description }) => (
  <div className="col-4 my-2">
    <GatsbyLink to={path}>
      <div className={`${styles.container} py-4`}>
        <h3 className={styles.title}>{title}</h3>
        {imageLink ? <img src={imageLink} /> : null}
      </div>
    </GatsbyLink>
  </div>
);

export default DocPreview;
