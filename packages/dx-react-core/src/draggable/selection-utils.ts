/* globals document:true window:true */

/** @internal */
export const clear = () => {
  if (window.getSelection) {
    if (window.getSelection().empty) {
      window.getSelection().empty();
    } else if (window.getSelection().removeAllRanges) {
      window.getSelection().removeAllRanges();
    }
  }
};
