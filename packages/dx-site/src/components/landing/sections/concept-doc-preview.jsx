import * as React from 'react';
import PropTypes from 'prop-types';
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

ConceptDocPreview.propTypes = {
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default ConceptDocPreview;
