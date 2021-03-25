import * as React from 'react';
import * as PropTypes from 'prop-types';
import PageLayout from './page-layout';
import ContainerWithMenu from './container-with-menu';
import Search from '../docs/search';

import navigation from '../../../page-navigation.json';

const titles = {
  'react/grid': 'Grid',
  'react/chart': 'Chart',
  'react/scheduler': 'Scheduler',
  'react/common': 'Common Concepts',
  'react/core': 'Core',
};

const startsWithCapitalLetter = word => word[0] === word[0].toUpperCase();

const sortApiItems = (apiItems) => {
  const classes = apiItems.filter(({ title }) => startsWithCapitalLetter(title));
  const methods = apiItems.filter(({ title }) => !startsWithCapitalLetter(title));

  const sort = items => items.sort((a, b) => a.title.localeCompare(b.title));

  return [
    ...sort(classes),
    ...sort(methods),
  ];
};

const prepareMenuItems = siteSection => ([
  { title: 'OVERVIEW', path: `/${siteSection}/` },
  ...Object.keys(navigation).reduce((acc, productSlug) => {
    if (navigation[productSlug][siteSection]) {
      acc.push({
        title: titles[productSlug],
        items: navigation[productSlug][siteSection].reduce((items, rawSection) => {
          let section = rawSection;
          if (navigation[productSlug][siteSection].length === 1) {
            return section.items;
          }
          if (section.title === 'API Reference') {
            section = {
              ...rawSection,
              items: sortApiItems(rawSection.items),
            };
          }
          return [...items, section];
        }, []),
      });
    }
    return acc;
  }, []),
]);

const DocsPageLayout = ({ children, sectionName, technologyName }) => (
  <PageLayout sectionName="docs">
    <ContainerWithMenu
      items={prepareMenuItems(sectionName)}
      menuAddon={(
        <Search
          technologyName={technologyName}
          sectionName={sectionName}
        />
      )}
    >
      {children}
    </ContainerWithMenu>
  </PageLayout>
);

DocsPageLayout.propTypes = {
  technologyName: PropTypes.string,
  sectionName: PropTypes.string.isRequired,
  children: PropTypes.node,
};

DocsPageLayout.defaultProps = {
  children: undefined,
  technologyName: 'react',
};

export default DocsPageLayout;
