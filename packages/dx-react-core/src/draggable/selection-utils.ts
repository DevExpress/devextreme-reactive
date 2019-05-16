/* globals document:true window:true */

/** @internal */
export const clear = () => {
  const selection = window.getSelection && window.getSelection();

  if (selection) {
    if (selection.empty) {
      selection.empty();
    } else if (selection.removeAllRanges) {
      selection.removeAllRanges();
    }
  }
};
