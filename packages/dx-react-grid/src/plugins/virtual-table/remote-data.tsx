import * as React from 'react';
import { Plugin, Action, Getters, Actions } from '@devexpress/dx-react-core';
import { nextPageReferenceIndex } from '@devexpress/dx-grid-core';

export class RemoteDataLoader extends React.PureComponent<any, any> {
  ensureNextVirtualPage = (
    payload: any,
    getters: Getters,
    { requestNextPage }: Actions,
  ) => {
    const { remoteDataEnabled } = getters;
    if (!remoteDataEnabled) {
      return;
    }

    const referenceIndex = nextPageReferenceIndex(payload, getters);
    if (referenceIndex !== null) {
      requestNextPage(referenceIndex);
    }
  }

  render() {
    return (
      <Plugin name="RemoteDataLoader">
        <Action name="ensureNextVirtualPage" action={this.ensureNextVirtualPage} />
      </Plugin>
    );
  }
}
