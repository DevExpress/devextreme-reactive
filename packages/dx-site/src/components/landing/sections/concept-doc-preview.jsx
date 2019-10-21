import * as React from 'react';
import GatsbyLink from 'gatsby-link';
import DocPreviewContainer from './doc-preview-container';

import styles from './concept-doc-preview.module.scss';

const ConceptDocPreview = ({ 
  path, title, description,
}) => (
  <DocPreviewContainer path={path} dense>
    <h6 className={styles.title}>
      {title}
    </h6>
    <span className={styles.description}>
      {description}
    </span>
  </DocPreviewContainer>
);

export default ConceptDocPreview;
