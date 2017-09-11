import PropTypes from 'prop-types';

export const TemplateRenderer = ({ template, params, children }) =>
  template(children ? { ...params, children } : params);

TemplateRenderer.propTypes = {
  template: PropTypes.func.isRequired,
  params: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
