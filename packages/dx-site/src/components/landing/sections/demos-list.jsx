import * as React from 'react';
import PropTypes from 'prop-types';
import FeaturedDemoPreview from './featured-demo-preview';
import Title from './title';
import ExampleLink from './example-link';

import styles from './demos-list.module.scss';

const allocateToColumns = (items, columns) => {
  const columnSize = Math.ceil(items.length / columns);
  return items.reduce((acc, item) => {
    if (acc[acc.length - 1].length === columnSize) {
      acc.push([]);
    }
    acc[acc.length - 1].push(item);
    return acc;
  }, [[]]);
};

const DemosList = ({
  data: {
    title, icon, featured, technical,
  },
}) => (
  <div className={`container ${styles.container}`}>
    <Title text={title} iconComponent={icon} />

    <div className="row my-4">
      {featured.map(demo => (
        <FeaturedDemoPreview key={demo.title} {...demo} />
      ))}
    </div>

    <div className="row mx-0">
      <div className="col-12">
        <h3 className={styles.subTitle}>
          Docs and Examples
        </h3>
      </div>
    </div>

    <div className="row my-2 mx-0">
      {allocateToColumns(technical, 4).map(column => (
        <div key={column[0].title} className="col-6 col-sm-4 col-md-3">
          {column.map(item => (
            <ExampleLink key={item.title} {...item} />
          ))}
        </div>
      ))}
    </div>
  </div>
);

DemosList.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    icon: PropTypes.func.isRequired,
    featured: PropTypes.array.isRequired,
    technical: PropTypes.array.isRequired,
  }).isRequired,
};

export default DemosList;
