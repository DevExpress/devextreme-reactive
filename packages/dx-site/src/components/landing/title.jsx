import * as React from 'react';
import * as PropTypes from 'prop-types';

import styles from './title.module.scss';

const Title = ({ text }) => (
  <div className={`col-md-12 ${styles.title}`}>
    {text}
  </div>
);

Title.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Title;
