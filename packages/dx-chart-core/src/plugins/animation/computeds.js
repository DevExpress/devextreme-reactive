import keyframes from 'jss-keyframes';

export const getAnimation = (startCoords, extension) => (animationName) => {
  const { keyframes: frames, options = () => {}, styles = () => {} } = extension
    .find(item => item.name === animationName);
  const animation = keyframes(frames(startCoords));
  return item => ({ animation: `${animation} ${options(item)}`, ...styles(startCoords, item) });
};

export const mergeExtensionsWithDefault = (extension) => {
  const defaultExtension = [
    {
      name: 'transform',
      options: () => '1s',
      styles: ({ y }, { x }) => ({ transformOrigin: `${x}px ${y}px` }),
      keyframes: () => ({
        from: { transform: 'scaleY(0)' },
      }),
    },
    {
      name: 'opacity',
      options: () => '1s',
      keyframes: () => ({
        '0%': { opacity: 0 },
        '50%': { opacity: 0 },
        '100%': { opacity: 1 },
      }),
    },
    {
      name: 'transformPie',
      options: ({ index }) => `${(index + 1) * 0.2}s`,
      keyframes: ({ x, y }) => ({
        from: { transform: `translate(${x}px, ${y}px) scale(0) ` },
        to: { transform: `translate(${x}px, ${y}px) scale(1)` },
      }),
    },
  ];
  return extension.concat(defaultExtension);
};
