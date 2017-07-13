export const TemplateComponent = ({ template, children, ...restProps }) =>
  template({ ...restProps, children });
