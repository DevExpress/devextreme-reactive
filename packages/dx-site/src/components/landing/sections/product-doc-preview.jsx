import * as React from 'react';
import GatsbyLink from 'gatsby-link';
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

export default ProductDocPreview;
