import * as React from 'react';
import GatsbyLink from 'gatsby-link';
import DocPreviewContainer from './doc-preview-container';

import styles from './product-doc-preview.module.scss';

const ProductDocPreview = ({ 
  title, path,
  imageComponent: Image,
}) => (
  <DocPreviewContainer path={path}>
    <Image className={styles.image} />
    <h3 className={styles.title}>
      {title}
    </h3>
  </DocPreviewContainer>
);

export default ProductDocPreview;
