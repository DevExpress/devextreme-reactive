export const isPlainObject = (object) => {
  if (!object || Object.prototype.toString.call(object) !== '[object Object]') {
    return false;
  }
  const proto = Object.getPrototypeOf(object);
  const ctor = Object.hasOwnProperty.call(proto, 'constructor') && proto.constructor;

  return typeof ctor === 'function'
    && Object.toString.call(ctor) === Object.toString.call(Object);
};
