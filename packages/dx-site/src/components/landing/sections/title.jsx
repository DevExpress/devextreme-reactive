import * as React from 'react';
import PropTypes from 'prop-types';
import styles from './title.module.scss';

const Title = ({ text, iconComponent: Icon }) => (
  <div className="row mx-0">
    <div className="col-md-12">
      <Icon className={styles.icon} />
      <h1 className={styles.title}>
        {text}
      </h1>
    </div>
  </div>
);

Title.propTypes = {
  text: PropTypes.string.isRequired,
  iconComponent: PropTypes.func.isRequired,
};

export default Title;
