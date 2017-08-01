import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';

export const triggerTouchTap = (element) => {
  const node = ReactDOM.findDOMNode(element); // eslint-disable-line react/no-find-dom-node
  TestUtils.Simulate.touchTap(node);
};
