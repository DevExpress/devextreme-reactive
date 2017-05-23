import React from 'react';
import PropTypes from 'prop-types';
import { Template, TemplatePlaceholder, PluginContainer } from '@devexpress/dx-react-core';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { Paper } from 'material-ui';

const styleSheet = createStyleSheet('GridLayout', theme => ({
  headingPanel: {
    padding: '12px',
    backgroundColor: theme.palette.text.lightDivider,
  },
  footerPanel: {
    padding: '12px',
    backgroundColor: theme.palette.text.lightDivider,
  },
}));

const LayoutBase = props => (
  <PluginContainer>
    <Template name="gridHeading" />
    <Template name="gridFooter" />

    <Template name="root">
      <Paper>
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
      </Paper>
    </Template>
  </PluginContainer>
);

LayoutBase.propTypes = {
  classes: PropTypes.object.isRequired,
};

export const Layout = withStyles(styleSheet)(LayoutBase);
