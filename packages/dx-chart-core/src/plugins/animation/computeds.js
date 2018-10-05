import keyframes from 'jss-keyframes';

export const getAnimationStyles = (options, name, startCoords) => {
  if (startCoords) {
    return {
      animation: `${name} ${options}`,
      transformOrigin: `${startCoords.x}px ${startCoords.y}px`,
    };
  }
  return { animation: `${name} ${options}` };
};

export const getAnimationKeyframes = frames => keyframes(frames);

export const mergeExtensionsWithDefault = (extension) => {
  const defaultExtension = [
    {
      name: 'transform',
      options: () => '1s',
      keyframes: () => ({
        from: { transform: 'scaleY(0)' },
      }),
    },
    {
      name: 'opacity',
      options: () => '1s',
      keyframes: () => ({
        from: { opacity: 0 },
      }),
    },
    {
      name: 'transformPie',
      options: ({ index }) => `${(index + 1) * 0.2}s`,
      keyframes: ({ x, y }) => ({
        from: { transform: `translate(${x}px, ${y}px) scale(0)` },
        to: { transform: `translate(${x}px, ${y}px) scale(1)` },
      }),
    },
  ];
  return extension.concat(defaultExtension);
};
