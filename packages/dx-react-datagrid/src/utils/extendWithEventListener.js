const creatMultipleHandler = () => {
  const handlers = [];
  const multipleHandler = (e) => {
    handlers.forEach(handler => handler(e));
  };
  multipleHandler.addHandler = handler => handlers.unshift(handler);
  return multipleHandler;
};

export default function extendWithEventListener(extraProps, name, handler) {
  const extendedExtraProps = extraProps;
  if (!extraProps[name]) {
    extendedExtraProps[name] = creatMultipleHandler();
  }
  extraProps[name].addHandler(handler);
  return extendedExtraProps;
}
