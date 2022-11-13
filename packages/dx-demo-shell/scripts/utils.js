import path from 'path';

export const getCurrentProductName = () => {
  const packageName = path.basename(path.resolve('./'));
  const productName = packageName.split('-')[2];
  return productName;
};
