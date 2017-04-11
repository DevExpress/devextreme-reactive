const creatMultipleHandler = () => {
  const handlers = [];
  const multipleHandler = (e) => {
    handlers.forEach(handler => handler(e));
  };
  multipleHandler.addHandler = handler => handlers.unshift(handler);
  return multipleHandler;
};

export default function extendWithEventListener(extraProps, name, handler) {
  const extendedExtraProps = Object.assign({}, extraProps);
  if (!extendedExtraProps[name]) {
    extendedExtraProps[name] = creatMultipleHandler();
  }
  extendedExtraProps[name].addHandler(handler);
  return extendedExtraProps;
}
