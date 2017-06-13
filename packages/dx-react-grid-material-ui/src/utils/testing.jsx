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

export const triggerTouchTap = (element) => {
  const node = ReactDOM.findDOMNode(element); // eslint-disable-line react/no-find-dom-node
  TestUtils.Simulate.touchTap(node);
};
