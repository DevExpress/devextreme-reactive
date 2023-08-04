export const getRowStyle = ({ row }) => (row.height !== undefined
  ? ({ height: `${row.height}px` })
  : undefined);

export const isNumber = (value: string | number) =>
  typeof value === 'number' || !Number.isNaN(Number(value));

export const recursiveBlur = (element: Element) => {
  if (element.children.length > 0){
      Array.from(element.children).forEach(child => recursiveBlur(child));
  }
  if (element instanceof HTMLElement){
    element.blur();
  }
}
