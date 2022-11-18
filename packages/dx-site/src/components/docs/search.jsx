/* globals docsearch:true */

import * as React from 'react';
import PropTypes from 'prop-types';

import styles from './search.module.scss';

const Search = ({ technologyName, sectionName }) => {
  React.useEffect(() => {
    if (sectionName === 'demos') return;
    const [techno] = technologyName.split('/');
    docsearch({
      apiKey: '4cd7a76d4bc286ae69fe26182a8d4b18',
      indexName: 'devextreme_reactive',
      inputSelector: '#docsearch',
      algoliaOptions: { facetFilters: [`techno:${techno}`] },
      debug: true,
    });
  });

  return (
    <input
      id="docsearch"
      className={`${styles.search} form-control`}
      placeholder="Search..."
    />
  );
};

Search.propTypes = {
  technologyName: PropTypes.string.isRequired,
  sectionName: PropTypes.string.isRequired,
};

export default Search;
