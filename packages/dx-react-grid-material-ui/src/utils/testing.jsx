import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';

import { mount } from 'enzyme';
import { create } from 'jss';
import jssPreset from 'jss-preset-default';
import { createStyleManager } from 'jss-theme-reactor';

import { createMuiTheme } from 'material-ui/styles';

export const mountWithStyles = (node, styleSheet) => {
  const theme = createMuiTheme();
  const jss = create(jssPreset());
  const styleManager = createStyleManager({ jss, theme });
  const context = {
    theme,
    styleManager,
  };
  const tree = mount(node, {
    context,
    childContextTypes: {
      theme: PropTypes.object.isRequired,
      styleManager: PropTypes.object.isRequired,
    },
  });
  if (styleSheet) {
    return {
      tree,
      classes: styleManager.render(styleSheet),
    };
  }
  return tree;
};

export const setupConsole = (config = {}) => {
  const savedConsoleError = console.error; // eslint-disable-line no-console
  console.error = (error) => { // eslint-disable-line no-console
    if (!config.ignore || !config.ignore.filter(message => error.includes(message)).length) {
      throw new Error(error);
    }
  };
  return () => {
    console.error = savedConsoleError; // eslint-disable-line no-console
  };
};

export const triggerTouchTap = (element) => {
  const node = ReactDOM.findDOMNode(element); // eslint-disable-line react/no-find-dom-node
  TestUtils.Simulate.touchTap(node);
};
