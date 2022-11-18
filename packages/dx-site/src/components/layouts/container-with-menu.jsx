import * as React from 'react';
import PropTypes from 'prop-types';
import LeftMenu from '../docs/left-menu';

import styles from './container-with-menu.module.scss';

const ContainerWithMenu = ({
  children, ...menuProps
}) => (
  <div className="row">
    <div className="col-lg-9 col-md-8 order-md-2 docs-content">
      <div className={styles.content}>
        {children}
      </div>
    </div>
    <div className="col-lg-3 col-md-4 order-md-1 main-menu">
      <div className={styles.sidebar}>
        <LeftMenu
          {...menuProps}
        />
      </div>
    </div>
  </div>
);

ContainerWithMenu.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContainerWithMenu;
