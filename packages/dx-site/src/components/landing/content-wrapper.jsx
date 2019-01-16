import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './content-wrapper.module.scss';

const ContentWrapper = ({
  children,
  leftImage,
  highlighted,
  flex,
  withContainer,
}) => (
  <div className={
    classNames({
      [styles.leftImage]: leftImage && !withContainer,
      [styles.highlighted]: highlighted,
      [styles.flex]: flex && !withContainer,
    })}
  >
    {withContainer ? (
      <div
        className={classNames({
          container: true,
          [styles.flex]: flex,
          [styles.leftImage]: leftImage,
        })}
      >
        {children}
      </div>
    ) : children}
  </div>
);

ContentWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  leftImage: PropTypes.bool,
  highlighted: PropTypes.bool,
  flex: PropTypes.bool,
  withContainer: PropTypes.bool,
};

ContentWrapper.defaultProps = {
  leftImage: false,
  highlighted: false,
  flex: false,
  withContainer: false,
};

export default ContentWrapper;
