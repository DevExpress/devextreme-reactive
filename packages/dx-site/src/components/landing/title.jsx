import * as React from 'react';
import PropTypes from 'prop-types';

import styles from './title.module.scss';

const Title = ({ text }) => (
  <div className="col-md-12">
    <div className={styles.title}>
      {text}
    </div>
  </div>
);

Title.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Title;
