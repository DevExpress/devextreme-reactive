import * as React from 'react';
import * as PropTypes from 'prop-types';
import Link from 'gatsby-link';
import styles from './product.module.scss';

const titles = {
  react: '',
  'react/core': 'Core',
  'react/grid': 'Grid',
  'react/chart': 'Chart',
  'react/scheduler': 'Scheduler',
};

const RootLink = ({ children }) => (
  <Link to="/" className={styles.product}>
    {children}
  </Link>
);

const capitalizeFirstLetter = str => str.charAt(0).toUpperCase() + str.slice(1);

const Separator = () => <span className={styles.prefix}>/</span>;

const ProductBreadcrumbs = ({ link, section }) => {
  const breadcrumbs = [
    ...(link.split('/').filter(l => l !== 'react') || []),
    ...(section ? [section] : []),
  ].map(b => ({
    link: `react/${b}`,
    text: capitalizeFirstLetter(b),
  }));

  if (!breadcrumbs.length) return null;

  const { text: activeText } = breadcrumbs.pop();

  return (
    <>
      {breadcrumbs.map(({ link, text }) => (
        <>
          <Separator />
          <Link to={link}>
            <span className={styles.prefix}>{text}</span>
          </Link>
        </>
      ))}
      <Separator />
      <span className={styles.main}>{activeText}</span>
    </>
  );
}

const Product = ({ link, section }) => (
  <>
    <div>
      <RootLink>
        <span className={styles.title}>
          DevExtreme
        </span>
      </RootLink>
      <ProductBreadcrumbs link={link} section={section} />
    </div>
    <RootLink>
      <span className={styles.name}>
        Reactive
      </span>
    </RootLink>
  </>
);

Product.propTypes = {
  link: PropTypes.string.isRequired,
};

export default Product;
