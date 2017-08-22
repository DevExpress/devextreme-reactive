import React from 'react';
import { createMount, getClasses } from 'material-ui/test-utils';
import { Header, Footer } from './layout';

describe('Header', () => {
  let mount;
  let classes;

  beforeAll(() => {
    mount = createMount();
    classes = getClasses(<Header>
      <div />
    </Header>);
  });
  afterAll(() => {
    mount.cleanUp();
  });

  it('should have a correct css class', () => {
    const tree = mount(
      <Header>
        <div />
      </Header>,
    );

    expect(tree.find(Header).hasClass(classes.headingPanel)).toBeTruthy();
  });
});

describe('Footer', () => {
  let mount;
  let classes;

  beforeAll(() => {
    mount = createMount();
    classes = getClasses(<Footer>
      <div />
    </Footer>);
  });
  afterAll(() => {
    mount.cleanUp();
  });

  it('should have a correct css class', () => {
    const tree = mount(
      <Footer>
        <div />
      </Footer>,
    );

    expect(tree.find(Footer).hasClass(classes.footerPanel)).toBeTruthy();
  });
});
