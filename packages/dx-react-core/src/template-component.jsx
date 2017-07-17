export const TemplateRenderer = ({ template, children, ...restProps }) =>
  template({ ...restProps, children });
