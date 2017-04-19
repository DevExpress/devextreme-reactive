import React from 'react';

export const childrenByType = (children, type) => {
  const result = [];
  React.Children.forEach(children, (child) => {
    if (child && child.type === type) {
      result.push(child);
    }
  });
  return result;
};

export const extractTemplates = (children, type) =>
  childrenByType(children, type).map(tmpl => ({
    predicate: tmpl.props.predicate,
    template: tmpl.props.children,
  }));

export const combineTemplates = (candidates, defaultTemplate) => (params) => {
  const suitable = candidates.filter(tmpl => !tmpl.predicate || tmpl.predicate(params))[0];
  if (suitable) {
    return suitable.template(params);
  }
  return defaultTemplate(params);
};
