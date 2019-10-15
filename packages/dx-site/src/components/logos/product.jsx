import * as React from 'react';
import * as PropTypes from 'prop-types';
import Link from 'gatsby-link';
import styles from './product.module.scss';

const capitalizeFirstLetter = str => str.charAt(0).toUpperCase() + str.slice(1);

const Separator = () => <span className={styles.prefix}>/</span>;

const disableLinks = ['react', 'common'];

const ProductBreadcrumbs = ({ link, section }) => {
  const breadcrumbs = [
    ...(link.split('/').filter(l => !disableLinks.includes(l)) || []),
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

const RootLink = ({ children }) => (
  <Link to="/" className={styles.product}>
    {children}
  </Link>
);

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
  section: PropTypes.string,
};

Product.defaultProps = {
  section: null,
};

export default Product;
