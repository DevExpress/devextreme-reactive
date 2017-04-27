import React from 'react';
import { Template, TemplatePlaceholder, PluginContainer } from '@devexpress/dx-react-core';

export const Layout = () => (
  <PluginContainer>
    <Template name="gridHeading" />
    <Template name="gridFooter" />

    <Template name="root">
      <div className="panel panel-default">
        <TemplatePlaceholder name="gridHeading">
          {content => (!content ? null : <div className="panel-heading">{content}</div>)}
        </TemplatePlaceholder>
        <TemplatePlaceholder name="gridBody" />
        <TemplatePlaceholder name="gridFooter">
          {content => (!content ? null : <div className="panel-footer">{content}</div>)}
        </TemplatePlaceholder>
      </div>
    </Template>
  </PluginContainer>
);
