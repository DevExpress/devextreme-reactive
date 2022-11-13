import * as React from 'react';
import PropTypes from 'prop-types';
import styles from './button-links-container.module.scss';

const ButtonLinksContainer = ({ children }) => (
  <span className={styles.links}>
    {children}
  </span>
);

ButtonLinksContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ButtonLinksContainer;
