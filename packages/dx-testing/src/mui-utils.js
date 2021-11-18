import * as ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';

function shallowRecursively(wrapper, selector) {
  if (wrapper.isEmptyRender() || typeof wrapper.getElement().type === 'string') {
    throw new Error(`Cannot shallow render to the requred component: ${selector}`);
  }

  const nextWrapper = wrapper.shallow();

  if (selector && wrapper.is(selector)) {
    return nextWrapper;
  }

  return shallowRecursively(nextWrapper, selector);
}
export function createShallow({ dive, untilSelector } = { dive: false }) {
  return (Component) => {
    const wrapper = shallow(Component);
    if (untilSelector) {
      return shallowRecursively(wrapper, untilSelector);
    }
    if (dive) {
      return wrapper.dive();
    }
    return wrapper;
  };
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
