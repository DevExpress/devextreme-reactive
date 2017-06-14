import React from 'react';
import { mount } from 'enzyme';

import { Template } from '@devexpress/dx-react-core';

import { Grid } from './grid';

describe('Grid', () => {
  it('should render root template', () => {
    const tree = mount(
      <Grid
        rows={[]}
        columns={[]}
        rootTemplate={({ headerTemplate, bodyTemplate, footerTemplate }) => (
          <div className="root">
            <div className="header">
              {headerTemplate()}
            </div>
            <div className="body">
              {bodyTemplate()}
            </div>
            <div className="footer">
              {footerTemplate()}
            </div>
          </div>
        )}
      >
        <Template name="header"><div className="header-content" /></Template>
        <Template name="body"><div className="body-content" /></Template>
        <Template name="footer"><div className="footer-content" /></Template>
      </Grid>,
    );

    const root = tree.find('.root');
    expect(root.exists()).toBeTruthy();
    expect(root.find('.header').find('.header-content').exists()).toBeTruthy();
    expect(root.find('.body').find('.body-content').exists()).toBeTruthy();
    expect(root.find('.footer').find('.footer-content').exists()).toBeTruthy();
  });

  it('should render header placeholder', () => {
    const tree = mount(
      <Grid
        rows={[]}
        columns={[]}
        rootTemplate={({ headerTemplate, bodyTemplate, footerTemplate }) => (
          <div>
            {headerTemplate()}
            {bodyTemplate()}
            {footerTemplate()}
          </div>
        )}
        headerPlaceholderTemplate={({ children }) =>
          <div className="header-placeholder">{children}</div>}
      >
        <Template name="header"><div className="header-content" /></Template>
      </Grid>,
    );

    expect(tree.find('.header-placeholder').find('.header-content').exists()).toBeTruthy();
  });

  it('should render footer placeholder with null children if there are no header elements', () => {
    const tree = mount(
      <Grid
        rows={[]}
        columns={[]}
        rootTemplate={({ headerTemplate, bodyTemplate, footerTemplate }) => (
          <div>
            {headerTemplate()}
            {bodyTemplate()}
            {footerTemplate()}
          </div>
        )}
        headerPlaceholderTemplate={({ children }) =>
          children && <div className="footer-placeholder">{children}</div>}
      />,
    );

    expect(!tree.find('.footer-placeholder').exists()).toBeTruthy();
  });

  it('should render footer placeholder', () => {
    const tree = mount(
      <Grid
        rows={[]}
        columns={[]}
        rootTemplate={({ headerTemplate, bodyTemplate, footerTemplate }) => (
          <div>
            {headerTemplate()}
            {bodyTemplate()}
            {footerTemplate()}
          </div>
        )}
        footerPlaceholderTemplate={({ children }) =>
          <div className="footer-placeholder">{children}</div>}
      >
        <Template name="footer"><div className="footer-content" /></Template>
      </Grid>,
    );

    expect(tree.find('.footer-placeholder').find('.footer-content').exists()).toBeTruthy();
  });

  it('should render footer placeholder with null children if there are no footer elements', () => {
    const tree = mount(
      <Grid
        rows={[]}
        columns={[]}
        rootTemplate={({ headerTemplate, bodyTemplate, footerTemplate }) => (
          <div>
            {headerTemplate()}
            {bodyTemplate()}
            {footerTemplate()}
          </div>
        )}
        footerPlaceholderTemplate={({ children }) =>
          children && <div className="footer-placeholder">{children}</div>}
      />,
    );

    expect(!tree.find('.footer-placeholder').exists()).toBeTruthy();
  });
});
