/* globals document:true */

let gestureCover: HTMLElement;
/** @internal */
export const toggleGestureCover = (toggle, cursor?) => {
  let style: React.CSSProperties = {
    pointerEvents: toggle ? 'all' : 'none',
  };
  if (toggle && cursor) {
    style = {
      ...style,
      cursor,
    };
  }
  if (!gestureCover) {
    style = {
      ...style,
      position: 'fixed',
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
      opacity: 0,
      zIndex: 2147483647,
    };

    gestureCover = document.createElement('div');
    document.body.appendChild(gestureCover);
  }
  Object.keys(style).forEach((key) => { gestureCover.style[key] = style[key]; });
};
