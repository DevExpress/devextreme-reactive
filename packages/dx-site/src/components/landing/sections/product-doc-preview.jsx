import * as React from 'react';
import PropTypes from 'prop-types';
import DocPreviewContainer from './shadow-container';

import styles from './product-doc-preview.module.scss';

const ProductDocPreview = ({
  title, path,
  imageComponent: Image,
}) => (
  <DocPreviewContainer path={path}>
    <div className={styles.alignWrapper}>
      <Image className={styles.image} />
      <h3 className={styles.title}>
        {title}
      </h3>
    </div>
  </DocPreviewContainer>
);

ProductDocPreview.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  imageComponent: PropTypes.func.isRequired,
};

export default ProductDocPreview;
