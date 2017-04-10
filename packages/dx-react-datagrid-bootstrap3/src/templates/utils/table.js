/* eslint-disable */
export const closest = (el, s) => {
  const matches = (el.document || el.ownerDocument).querySelectorAll(s);
  let i;
  do {
    i = matches.length;
    while (--i >= 0 && matches.item(i) !== el) {};
  } while ((i < 0) && (el = el.parentElement));
  return el;
};
/* eslint-enable */
