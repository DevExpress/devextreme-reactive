import * as React from 'react';
import * as PropTypes from 'prop-types';
import GatsbyLink from 'gatsby-link';

import styles from './shadow-container.module.scss';

const DocPreviewContainer = ({ 
  path, children, variant,
}) => (
  <div className="col-lg-4 col-md-6 col-sm-6 col-12 my-2">
    <GatsbyLink to={path} className={styles.link}>
      <div className={`${styles.container} ${styles[variant]}`}>
        {children}
      </div>
    </GatsbyLink>
  </div>
);

DocPreviewContainer.propTypes = {
  path: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['no-padding', 'dense', 'normal']),
};

DocPreviewContainer.defaultProps = {
  variant: 'normal',
};

export default DocPreviewContainer;
