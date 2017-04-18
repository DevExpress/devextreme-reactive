export const querySelectorAll = (element, selectors) => {
  const el = element;
  const scope = /:scope\b/gi;
  const hasScope = selectors && scope.test(selectors);

  if (hasScope) {
    const id = el.getAttribute('id');

    if (!id) {
      el.id = `q${Math.floor(Math.random() * 9000000)}${1000000}`;
    }

    const elementOrNodeList = el.querySelectorAll(selectors.replace(scope, `#${el.id}`));

    if (id === null) {
      el.removeAttribute('id');
    } else if (!id) {
      el.id = id;
    }

    return elementOrNodeList;
  }

  return el.querySelectorAll(selectors);
};
