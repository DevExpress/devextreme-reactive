import PropTypes from 'prop-types';

export const TemplateRenderer = ({ template, templateRef, ...restProps }) =>
  template({ ...restProps, ref: templateRef });

TemplateRenderer.propTypes = {
  template: PropTypes.func.isRequired,
  templateRef: PropTypes.func,
};
