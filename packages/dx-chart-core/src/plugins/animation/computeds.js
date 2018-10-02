import { keyframes } from 'styled-components';

export const getAnimationStyles = ({ keyframes: frames, options }) => {
  const name = keyframes`${frames}`;
  return { animation: `${name} ${options}` };
};

export const mergeExtensionsWithDefault = (extension) => {
  const defaultExtension = [
    {
      name: 'transform',
      settings: (_, { x, y }) => ({
        options: '1s',
        keyframes: `from {transform: scaleY(0); transform-origin: ${x}px ${y}px; } to { transition: none; transform-origin: ${x}px ${y}px;}`,
      }),
    },
    {
      name: 'translate',
      settings: ({ x, y }, { y: startY }) => ({
        options: '1s',
        keyframes: `from {transform: translate(${x}px, ${startY}px )} to {transform: translate(${x}px, ${y}px )}`,
      }),
    },
    {
      name: 'transformPie',
      settings: ({ index }, { x, y }) => ({
        options: `${(index + 1) * 0.2}s`,
        keyframes: `from {transform: translate(${x}px, ${y}px) scale(0)}; to {transform: translate(${x}px, ${y}px) scale(1)}`,
      }),
    },
  ];
  return extension.concat(defaultExtension);
};
