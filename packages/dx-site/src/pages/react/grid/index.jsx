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
import imageBoxLink from '../../images/image-box.png';
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
import LandingIconFeature from '../../../components/landing/icon-feature';
import LandingLayout from '../../../components/landing/layout';
import LandingTitle from '../../../components/landing/title';
import LandingImageFeature from '../../../components/landing/image-feature';
import LandingProductFloatImage from '../../../components/landing/product-float-image';
import bootstrapThemeLink from './images/bootstrap-theme.png';
import materialThemeLink from './images/material-theme.png';
import AlternatedBackground from '../../../components/landing/alternated-background';

const pageData = [
  {
    sectionTitle: 'Performance at its Best',
    title: '100% Pure React',
    description: 'We\'ve focused our energy on performance and leveraged the best practice recommendations offered by the React team. Through immutability and pure functions, we can apply memoization and built-in React optimizations to achieve outstanding performance.',
    imageLink: pureReactImage,
    guideLink: '/react/grid/docs/guides/getting-started/',
  },
  {
    title: 'Virtual Scrolling',
    description: 'Virtual scrolling allows the Grid component to display thousands of records on a single page. It can render only the records that are currently visible to a user and remove them from DOM once the user scroll them out of visible range.',
    imageLink: virtualScrollingImage,
    guideLink: '/react/grid/docs/guides/virtual-scrolling/',
  },
  {
    sectionTitle: 'Shape and Analyse Data as You Need',
    title: 'Milti-Column Sorting',
    description: 'Allow a user to sort data in the Grid by any number of columns. It is possible to apply and remove soring for a specific column using the command keys on your keyboard. You can also perform sorting operations on the server-side.',
    imageLink: sortingImage,
    guideLink: '/react/grid/docs/guides/sorting/',
  },
  {
    title: 'Multi-Column Grouping',
    description: 'Data grouping is a highly effective way to summarize information for end-users. You can enable grouping by one or several columns programmatically or let your end-users do it via mouse, keyboard or touch gestures on mobile devices.',
    imageLink: groupingImage,
    guideLink: '/react/grid/docs/guides/grouping/',
  },
  {
    alternative: true,
    title: 'Summaries & Data Aggregates',
    description: 'Easily turn your data Grid into an analytics tool enabling built-in data aggregation capabilities implemented as a Summary Row plugin. The Grid can calculate sums, averages, minimums, maximums and custom summary values for both separate groups and the whole data set.',
    imageLink: summariesImage,
    guideLink: '/react/grid/docs/guides/summary-row/',
  },
  {
    reversed: true,
    title: 'Multi-Column Filtering',
    description: 'Intuitive column based search.  With enabled Filter Row plugin, users can filter the contents of the grid by individual column values. Based on the data type associated with a column, you can control the search operators used (Contains, Equals, etc).',
    imageLink: filteringImage,
    guideLink: '/react/grid/docs/guides/filtering/',
  },
  {
    alternative: true,
    title: 'Search Panel',
    description: 'A simple and quick way to find records. The Search Panel plugin removes all complexities associated with data filtering. Once enabled, the Search Panel allows users to enter a search string and initiate a search against all values displayed in the grid.',
    imageLink: searchingImage,
    guideLink: '/react/grid/docs/guides/searching/',
  },
  {
    sectionTitle: 'Manage Complex Data Structures',
    title: 'Tree View Mode',
    description: 'The Tree View plugin allows you to display hierarchical data sets of any structures withing the React Grid. It smoothly integrates with other Grid plugins enabling sorting, paging, filtering and other features of a regular plain data grid.',
    imageLink: treeViewImage,
    guideLink: '/react/grid/docs/guides/tree-data/',
  },
  {
    alternative: true,
    title: 'Detail Row',
    description: 'A simple and quick way to find records. The Search Panel plugin removes all complexities associated with data filtering. Once enabled, the Search Panel allows users to enter a search string and initiate a search against all values displayed in the grid.',
    imageLink: detailRowImage,
    guideLink: '/react/grid/docs/guides/detail-row/',
  },
  {
    sectionTitle: 'Data Editing at Your Full Control',
    title: 'Built-in Edit Action Column',
    description: 'From a read-only to an editable React Grid in a couple lines of code. The Grid ships with a ready-to-use set of plugins that enable data editing capabilities for your end-users. As a developer, you have full control over data editing process via the plugin API.',
    imageLink: actionColumnImage,
    guideLink: '/react/grid/docs/guides/editing/#uncontrolled-mode',
  },
  {
    title: 'Customizable Inplace Cell Editors',
    description: 'The React Grid ships with the Data Type Provider plugin that allows you to show custom inplace cell editors depending on a specific data type. Use what you need in your app - from standard textboxes, to date pickers and everything in between.',
    imageLink: cellEditorsImage,
    guideLink: '/react/grid/docs/guides/data-formatting/#custom-editors',
  },
  {
    reversed: true,
    title: 'Batch Editing',
    description: 'Batch modifications allow you to apply several record changes at once to improve user experience and data entry effeciency. If you work with remote data, it can also eliminate the unnecessary remote data update requests improving the overall performance.',
    imageLink: batchEditingImage,
    guideLink: '/react/grid/docs/guides/editing/',
  },
  {
    alternative: true,
    title: 'Data Selection',
    description: 'End-users can select data rows via a click/tap on a row or using the built-in selection column with checkboxes. Depending on your business requirements you can enable the \'Select All\' checkbox and configure if it should select only current page or all available records.',
    imageLink: selectionImage,
    guideLink: '/react/grid/docs/guides/selection/',
  },
  {
    sectionTitle: 'UI Customization For Your Users and You',
    title: 'Column Resizing/Reordering',
    description: 'End-users can resize and reorder columns while working with your application. Use the \'controlled state\' mode to expose the current customization state to your application logic for persistence. Save and restore it when a user leaves and returns to your app.',
    imageLink: columnResizingImage,
    guideLink: '/react/grid/docs/guides/column-resizing/',
  },
  {
    title: 'Column Chooser',
    description: 'Our React Grid ships with a column chooser UI. It allows your users to show/hide required columns at runtime. You can predefine the set of visible columns and save/restore the customizations made by a end-user to the browser local storage or into a remote database.',
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
    description: 'Improve your Grid UI readability via grouping your column headers into bands. Multi-level column groups are supported via a corresponding plugin that we ship with the React Grid.',
    imageLink: columnBandsImage,
    guideLink: '/react/grid/docs/guides/banded-columns/',
  },
  {
    title: 'Custom UI Rendering',
    description: 'We know that your requirements may go far behind the built-in React Grid capabilities. That\'s why we made everything possible to simplify UI and behavior customization. Override, modify or extend the built-in functionality according to your business needs.',
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
            <React.Fragment>
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
            </React.Fragment>
          )}
        />
      )}
    />

    <AlternatedBackground style={{ paddingBottom: '2rem' }}>
      <LandingProductFloatImage imageLink={headerLink} />
      <div className="row my-3" />
      <LandingChessBoardLayoutList data={pageData} colSize={6} />
    </AlternatedBackground>

    <LandingLayout style={{ paddingTop: '2em', paddingBottom: '2em' }}>
      <LandingTitle text="Native Support for the UI Library of Your Choice" />
      <LandingImageFeature
        imageLink={bootstrapThemeLink}
        title="Twitter Bootstrap React Grid"
        description="Use any existing or create your custom bootstrap theme. No need for any additional configuration."
      />
      <LandingImageFeature
        imageLink={materialThemeLink}
        title="Material-UI React Grid"
        description="We ship additional Material-UI packages that allow you to utilize the familiar approaches and appearance."
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
        <React.Fragment>
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
        </React.Fragment>
      )}
    />
  </Layout>
);

export default IndexPage;
