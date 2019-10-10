import * as React from 'react';
import * as PropTypes from 'prop-types';
import LeftMenu from '../docs/left-menu';

import styles from './container-with-menu.module.scss';

const ContainerWithMenu = ({
  isDocPage, children,
  ...menuProps
}) => (
  <div className={isDocPage ? styles.docsPageLayout : styles.pageLayout}>
    <div className="container">
      <div className="row">
        <div className="col-md-9 order-md-2">
          <div className={styles.content}>
            {children}
          </div>
        </div>
        <div className="col-md-3 order-md-1">
          <div className={styles.sidebar}>
            <LeftMenu
              {...menuProps}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

ContainerWithMenu.propTypes = {
  isDocPage: PropTypes.boolean,
};

ContainerWithMenu.defaultProps = {
  isDocPage: false,
};

export default ContainerWithMenu;
