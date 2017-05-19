import React from 'react';
import PropTypes from 'prop-types';
import { Template, TemplatePlaceholder, PluginContainer } from '@devexpress/dx-react-core';
import { withStyles, createStyleSheet } from 'material-ui/styles';

const styleSheet = createStyleSheet('GridLayout', theme => ({
  headingPanel: {
    padding: 12,
    backgroundColor: theme.palette.text.lightDivider,
  },
  footerPanel: {
    padding: 12,
    backgroundColor: theme.palette.text.lightDivider,
  },
}));

const LayoutBase = props => (
  <PluginContainer>
    <Template name="gridHeading" />
    <Template name="gridFooter" />

    <Template name="root">
      <div>
        <TemplatePlaceholder name="gridHeading">
          {content => (
            content ? <div className={props.classes.headingPanel}>{content}</div> : null
          )}
        </TemplatePlaceholder>
        <TemplatePlaceholder name="gridBody" />
        <TemplatePlaceholder name="gridFooter">
          {content => (
            content ? <div className={props.classes.footerPanel}>{content}</div> : null
          )}
        </TemplatePlaceholder>
      </div>
    </Template>
  </PluginContainer>
);

LayoutBase.propTypes = {
  classes: PropTypes.object.isRequired,
};

export const Layout = withStyles(styleSheet)(LayoutBase);
