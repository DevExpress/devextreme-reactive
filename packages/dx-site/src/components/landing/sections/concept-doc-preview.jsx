import * as React from 'react';
import GatsbyLink from 'gatsby-link';
import DocPreviewContainer from './shadow-container';

import styles from './concept-doc-preview.module.scss';

const ConceptDocPreview = ({ 
  path, title, description,
}) => (
  <DocPreviewContainer path={path} variant="dense">
    <h6 className={styles.title}>
      {title}
    </h6>
    <span className={styles.description}>
      {description}
    </span>
  </DocPreviewContainer>
);

export default ConceptDocPreview;
