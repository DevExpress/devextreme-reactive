import * as React from 'react';
import Helmet from 'react-helmet';
import Layout from '../../../components/layouts/layout';
import Header from '../../../components/header';
import LandingHeaderAddon from '../../../components/landing/header-addon';
import LandingMaintainence from '../../../components/landing/maintainence';
import LandingLink from '../../../components/landing/link';
import LandingProductLinks from '../../../components/landing/product-links';
import LandingReadyToLearnMore from '../../../components/landing/ready-to-learn-more';
import LandingChessBoardLayoutList from '../../../components/landing/features-list';
import headerLink from './images/header.png';
import pureReactImage from './images/Pure-React.png';
import virtualScrollingImage from './images/Virtual-Scrolling.png';
import sortingImage from './images/Milti-Column-Sorting.png';
import groupingImage from './images/Multi-Column-Grouping.png';
import summariesImage from './images/Summaries.png';
import filteringImage from './images/Multi-Column-Filtering.png';
import searchingImage from './images/Search-Panel.png';
import treeViewImage from './images/Tree-View.png';
import detailRowImage from './images/Detail-Row.png';
import actionColumnImage from './images/Action-Column.png';
import cellEditorsImage from './images/Customizable-Cell-Editor.png';
import batchEditingImage from './images/Batch-Editing.png';
import selectionImage from './images/Data-Selection.png';
import columnChooserImage from './images/Column-Chooser.png';
import columnResizingImage from './images/Column-Resizing.png';
import fixedColumnsImage from './images/Fixed-Columns.png';
import columnBandsImage from './images/Column-Bands.png';
import customUIRenderingImage from './images/Custom-UI-Rendering.png';

import LandingThingsThatMatter from '../../../components/landing/things-that-matter';
import ButtonLinksContainer from '../../../components/landing/button-links-container';
import LandingLayout from '../../../components/landing/layout';
import LandingTitle from '../../../components/landing/title';
import LandingImageFeature from '../../../components/landing/image-feature';
import LandingProductFloatImage from '../../../components/landing/product-float-image';
import bootstrapThemeLink from './images/bootstrap-theme.png';
import materialThemeLink from './images/material-theme.png';
import AlternatedBackground from '../../../components/landing/alternated-background';
import NotificationBox from '../../../components/docs/notification-box';

const pageData = [
  {
    sectionTitle: 'Performance at its Best',
    title: '100% Pure React',
    description: 'We\'ve focused our energy on performance and leveraged best practice recommendations from the React team. Through immutability and pure functions, we apply ‘memoization’ and built-in React optimizations to achieve outstanding React Grid performance.',
    imageLink: pureReactImage,
    guideLink: '/react/grid/docs/guides/getting-started/',
  },
  {
    title: 'Virtual Scrolling',
    description: 'Virtual scrolling allows our React Grid component to display thousands of records on a single page. DevExtreme React Grid can render only those records visible to users and remove them from the DOM once the user scrolls past the visible range.',
    imageLink: virtualScrollingImage,
    guideLink: '/react/grid/docs/guides/virtual-scrolling/',
  },
  {
    sectionTitle: 'Shape and Analyze Data as You Need',
    title: 'Milti-Column Sorting',
    description: 'Allow a user to sort data within the Grid against multiple columns. You can apply and remove sort order column using the command keys on your keyboard. You can also execute sort operations on the server-side.',
    imageLink: sortingImage,
    guideLink: '/react/grid/docs/guides/sorting/',
  },
  {
    title: 'Multi-Column Grouping',
    description: 'Data grouping is a highly effective way to summarize/organize information for end-users. You can enable grouping against one or more columns programmatically or allow your end-users to group data via the mouse, keyboard or through touch gestures on mobile devices.',
    imageLink: groupingImage,
    guideLink: '/react/grid/docs/guides/grouping/',
  },
  {
    alternative: true,
    title: 'Summaries & Data Aggregates',
    description: 'Easily turn your data Grid into an analytics tool with our built-in data aggregation features. Implemented as a Summary Row plugin, our Grid can calculate sums, averages, minimums, maximums and custom summary values for both separate groups and the entire data set.',
    imageLink: summariesImage,
    guideLink: '/react/grid/docs/guides/summary-row/',
  },
  {
    reversed: true,
    title: 'Multi-Column Filtering',
    description: 'Intuitive column-based search. With our Filter Row plugin, users can filter the contents of the React Grid by individual column values. Based on the data type associated with a column, you can control the search operators used (Contains, Equals, etc).',
    imageLink: filteringImage,
    guideLink: '/react/grid/docs/guides/filtering/',
  },
  {
    alternative: true,
    title: 'Search Panel',
    description: 'A simple and quick way to locate records. The Search Panel plugin removes all complexities associated with data filtering. Once enabled, the Search Panel allows users to enter a search string and initiate a search against all values displayed in the grid.',
    imageLink: searchingImage,
    guideLink: '/react/grid/docs/guides/searching/',
  },
  {
    sectionTitle: 'Manage Complex Data Structures',
    title: 'Tree View Mode',
    description: 'The Tree View plugin allows you to display hierarchical data sets within the React Grid. Our Tree View plugin integrates with other Grid plugins.',
    imageLink: treeViewImage,
    guideLink: '/react/grid/docs/guides/tree-data/',
  },
  {
    alternative: true,
    title: 'Detail Row',
    description: 'Extend each Grid data row with a collapsible detail view. This feature allows you to address a variety of business usage scenarios from Master-Detail collection management to in-place record-related data editing and visualization.',
    imageLink: detailRowImage,
    guideLink: '/react/grid/docs/guides/detail-row/',
  },
  {
    sectionTitle: 'Data Editing at Your Full Control',
    title: 'Built-in Edit Action Column',
    description: 'From a read-only to a fully editable React Grid with a couple lines of code. Our React Grid ships with integrated data editing plugins. As a developer, you have full control over the data editing process via its straightforward API.',
    imageLink: actionColumnImage,
    guideLink: '/react/grid/docs/guides/editing/#uncontrolled-mode',
  },
  {
    title: 'Customizable In-place Cell Editors',
    description: 'Our React Grid ships with a Data Type Provider plugin that allows you to display custom in-place cell editors (based upon data type). Use what you need in your app - from standard textboxes, to date pickers and everything in between.',
    imageLink: cellEditorsImage,
    guideLink: '/react/grid/docs/guides/data-formatting/#custom-editors',
  },
  {
    reversed: true,
    title: 'Batch Editing',
    description: 'Batch modifications allow you to apply multiple record changes simultaneously and to improve data entry efficiency. When working with remote data, batch modifications can also help eliminate unnecessary remote data update requests.',
    imageLink: batchEditingImage,
    guideLink: '/react/grid/docs/guides/editing/',
  },
  {
    alternative: true,
    title: 'Data Selection',
    description: 'End-users can select data via a row click/tap or by using the grid’s built-in checkbox selection column. You can activate our \'Select All\' checkbox and configure it to select records on the current page or all records linked to the grid.',
    imageLink: selectionImage,
    guideLink: '/react/grid/docs/guides/selection/',
  },
  {
    sectionTitle: 'UI Customization for Your Users and You',
    title: 'Column Resizing/Reordering',
    description: 'End-users can resize and reorder columns as needed. Use our \'controlled state\' mode to expose the current customization state to your application logic for persistence. Save and restore it when a user leaves and/or returns to your app.',
    imageLink: columnResizingImage,
    guideLink: '/react/grid/docs/guides/column-resizing/',
  },
  {
    title: 'Column Chooser',
    description: 'Our React Grid ships with an integrated column chooser UI. With it, users can display/hide desired grid columns at runtime. You can specify the set of visible columns and save/restore customizations made by end-users to the browser’s local storage or into a remote database.',
    imageLink: columnChooserImage,
    guideLink: '/react/grid/docs/guides/column-visibility/',
  },
  {
    title: 'Fixed Columns',
    description: 'Fixed Columns allow you to anchor columns to the left or rightmost edge of the Grid. These fixed columns are never scrolled horizontally and as such, allow you to create solutions that offer improved readability and visual clarity.',
    imageLink: fixedColumnsImage,
    guideLink: '/react/grid/docs/guides/fixed-columns/',
  },
  {
    title: 'Column Bands',
    description: 'Improve usability/readability by grouping your column headers into bands. Multi-level column groups are supported via a corresponding plugin.',
    imageLink: columnBandsImage,
    guideLink: '/react/grid/docs/guides/banded-columns/',
  },
  {
    title: 'Custom UI Rendering',
    description: 'We done everything possible to simplify UI and behavior customization. With our React Grid, you can override, modify or extend built-in functionality to fully address business needs.',
    imageLink: customUIRenderingImage,
    guideLink: '/react/grid/demos/featured/data-editing/',
  },
];

const IndexPage = () => (
  <Layout>
    <Helmet title="React Grid" />
    <Header
      page="productPage"
      links={<LandingProductLinks />}
      addon={(
        <LandingHeaderAddon
          main="React Grid"
          additional={(
            <>
              for Bootstrap and Material-UI
              <ButtonLinksContainer>
                <LandingLink
                  to="/react/grid/docs/guides/getting-started/"
                  variant="button"
                  title="Getting Started"
                  fixedWidth
                >
                  Getting Started
                </LandingLink>
                {' '}
                <LandingLink
                  to="/react/grid/demos/"
                  type="react"
                  variant="button"
                  title="Demos"
                  fixedWidth
                >
                  Demos
                </LandingLink>
              </ButtonLinksContainer>
            </>
          )}
        />
      )}
    />
    <LandingProductFloatImage imageLink={headerLink} />
    <AlternatedBackground style={{ paddingBottom: '2rem' }}>
      <NotificationBox  style={{ paddingTop: '40px' }}/>
      <LandingChessBoardLayoutList data={pageData} colSize={6} />
    </AlternatedBackground>

    <LandingLayout style={{ paddingTop: '2em', paddingBottom: '2em' }}>
      <LandingTitle text="Native Support for the UI Library of Your Choice" />
      <LandingImageFeature
        imageLink={bootstrapThemeLink}
        title="Twitter Bootstrap React Grid"
        description="Use any existing theme or create a custom bootstrap theme as necessary. No need for any additional configuration."
      />
      <LandingImageFeature
        imageLink={materialThemeLink}
        title="Material-UI React Grid"
        description="Leverage both the user and developer experience of the Material-UI library."
      />
    </LandingLayout>

    <AlternatedBackground>
      <LandingLayout>
        <LandingThingsThatMatter />
      </LandingLayout>
    </AlternatedBackground>

    <LandingMaintainence />
    <LandingReadyToLearnMore
      links={(
        <>
          <LandingLink
            to="/react/grid/docs/guides/getting-started/"
            variant="button"
            title="Getting Started"
            fixedWidth
            condensed
          >
            Getting Started
          </LandingLink>
          <LandingLink
            to="/react/grid/demos/"
            type="react"
            variant="button"
            title="Demos"
            fixedWidth
            condensed
          >
            Demos
          </LandingLink>
        </>
      )}
    />
  </Layout>
);

export default IndexPage;
