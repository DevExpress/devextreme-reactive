import { keyframes } from 'styled-components';

export const getAnimationStyles = ({ keyframes: frames, styles, options }) => {
  const name = keyframes`${frames}`;
  return { ...styles, animation: `${name} ${options}` };
};

export const mergeExtensionsWithDefault = (extension) => {
  const defaultExtension = [
    {
      transform: (_, { x, y }) => ({
        options: '1s',
        styles: { transformOrigin: `${x}px ${y}px` },
        keyframes: 'from {transform: scaleY(0);}',
      }),
    },
    {
      translate: ({ x, y }, { y: startY }) => ({
        options: '1s',
        keyframes: `from {transform: translate(${x}px, ${startY}px )} to {transform: translate(${x}px, ${y}px )}`,
      }),
    },
    {
      pie: ({ index }, { x, y }) => ({
        options: `${index * 0.2}s`,
        keyframes: `from {transform: translate(${x}px, ${y}px) scale(0)}; to {transform: translate(${x}px, ${y}px) scale(1)}`,
      }),
    },
  ];
  return extension.concat(defaultExtension);
};
