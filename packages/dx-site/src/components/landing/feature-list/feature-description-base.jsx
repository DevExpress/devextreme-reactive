import * as React from 'react';
import PropTypes from 'prop-types';

const FeatureDescriptionBase = ({
  title, description, guideLink,
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
  guideLink: PropTypes.string.isRequired,
  titleComponent: PropTypes.func.isRequired,
  descriptionComponent: PropTypes.func.isRequired,
  description: PropTypes.string,
  title: PropTypes.string,
};

FeatureDescriptionBase.defaultProps = {
  description: undefined,
  title: undefined,
};

export default FeatureDescriptionBase;
