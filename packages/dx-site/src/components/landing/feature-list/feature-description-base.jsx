import * as React from 'react';
import * as PropTypes from 'prop-types';

const FeatureDescriptionBase = ({
  title, description, guideLink, styles,
  titleComponent: Title,
  descriptionComponent: Description,
}) => (
  <div>
    <Title guideLink={guideLink}>
      {title}
    </Title>
    <Description>
      {description}
    </Description>
  </div>
);

FeatureDescriptionBase.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  styles: PropTypes.object,
};

FeatureDescriptionBase.defaultProps = {
  description: undefined,
  title: undefined,
  styles: null,
};

export default FeatureDescriptionBase;
