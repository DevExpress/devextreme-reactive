/* globals window:true document:true */
let offsetY = 0;

const getTargetOffset = (hash) => {
  const id = window.decodeURI(hash.replace('#', ''));
  if (id !== '') {
    const element = document.getElementById(id);
    if (element) {
      return element.offsetTop - offsetY;
    }
  }
  return null;
};

const scrollToHash = () => {
  const offset = getTargetOffset(window.location.hash);
  if (offset !== null) {
    window.scrollTo(0, offset);
  }
};

exports.onInitialClientRender = (_, pluginOptions) => {
  if (pluginOptions.offsetY) {
    // eslint-disable-next-line prefer-destructuring
    offsetY = pluginOptions.offsetY;
  }

  window.addEventListener('load', () => {
    window.requestAnimationFrame(scrollToHash);
    window.setTimeout(scrollToHash, 500); // NOTE: wait for iframes to load
  });
};

exports.shouldUpdateScroll = ({ routerProps: { location } }) => {
  const offset = getTargetOffset(location.hash);
  return offset !== null ? [0, offset] : true;
};
