import * as React from 'react';
import { Plugin, Action, Getters, Actions } from '@devexpress/dx-react-core';

export class RemoteDataLoader extends React.PureComponent<any, any> {
// move triggers meta here
  ensureNextVirtualPage = (
    { currentPageTriggersMeta, scrollTop, containerHeight },
    { remoteDataEnabled }: Getters,
    { requestNextPage }: Actions,
  ) => {
    if (!remoteDataEnabled) return;

    const {
      topTriggerPosition, bottomTriggerPosition, topTriggerIndex, bottomTriggerIndex,
    } = currentPageTriggersMeta;
    const { estimatedRowHeight } = this.props;
    const referencePosition = scrollTop + containerHeight / 2;

    const getReferenceIndex = (triggetIndex, triggerPosition) => (
      triggetIndex + Math.round((referencePosition - triggerPosition) / estimatedRowHeight)
    );

    let referenceIndex = null;
    if (referencePosition < topTriggerPosition) {
      referenceIndex = getReferenceIndex(topTriggerIndex, topTriggerPosition);
    }
    if (bottomTriggerPosition < referencePosition) {
      referenceIndex = getReferenceIndex(bottomTriggerIndex, bottomTriggerPosition);
    }

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
