const isEqual = (
  { width: firstWidth, height: firstHeight },
  { width: secondWidth, height: secondHeight },
) => firstWidth === secondWidth && firstHeight === secondHeight;

export const bBoxes = (prevBBoxes, { bBox, placeholder }) => {
  if (isEqual(prevBBoxes[placeholder] || {}, bBox)) return prevBBoxes;
  return { ...prevBBoxes, [placeholder]: bBox };
};
