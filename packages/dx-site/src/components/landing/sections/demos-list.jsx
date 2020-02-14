import * as React from 'react';
import GatsbyLink from 'gatsby-link';
import FeaturePreview from '../feature-list/feature-preview';
import ShadowContainer from './shadow-container';
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
  }, [[]])
};

const DemosList = ({ data: { title, icon, featured, technical } }) => (
  <div className={`container ${styles.container}`}>
    <Title text={title} iconComponent={icon} />

    <div className="row my-4">
      {featured.map((demo) => (
        <FeaturedDemoPreview {...demo} />
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
        <div className="col-6 col-sm-4 col-md-3">
          {column.map(item => (
            <ExampleLink {...item} />
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default DemosList;
