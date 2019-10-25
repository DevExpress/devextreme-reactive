import * as React from 'react';
import * as PropTypes from 'prop-types';
import GatsbyLink from 'gatsby-link';

import styles from './doc-preview-container.module.scss';

const DocPreviewContainer = ({ 
  path, children, dense,
}) => (
  <div className="col-lg-4 col-md-6 col-sm-6 col-12 my-2">
    <GatsbyLink to={path} className={styles.link}>
      <div className={`${styles.container} ${dense ? styles.dense : ''}`}>
        {children}
      </div>
    </GatsbyLink>
  </div>
);

DocPreviewContainer.propTypes = {
  path: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  dense: PropTypes.bool,
};

DocPreviewContainer.defaultProps = {
  dense: false,
};

export default DocPreviewContainer;
