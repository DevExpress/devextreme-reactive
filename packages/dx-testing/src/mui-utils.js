import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';

export function createShallow() {
  return Component => shallow(Component).dive();
}

export function getClasses(element) {
  const { useStyles } = element.type;
  let classes;

  function Listener() {
    classes = useStyles(element.props);
    return null;
  }

  shallow(React.createElement(Listener, null));
  return classes;
}
export function createMount() {
  const attachTo = document.createElement('div');
  attachTo.className = 'app';
  attachTo.setAttribute('id', 'app');
  document.body.insertBefore(attachTo, document.body.firstChild);

  const mountWithContext = function mountWithContext(node, localOptions = {}) {
    const { disableUnnmount = false } = localOptions;
    if (!disableUnnmount) {
      ReactDOM.unmountComponentAtNode(attachTo);
    }
    return mount(node, {
      attachTo,
    });
  };

  mountWithContext.attachTo = attachTo;
  mountWithContext.cleanUp = () => {
    ReactDOM.unmountComponentAtNode(attachTo);
    attachTo.parentElement.removeChild(attachTo);
  };

  return mountWithContext;
}
