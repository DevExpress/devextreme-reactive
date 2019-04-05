import * as React from 'react';
import { Plugin, Action, Getters, Actions } from '@devexpress/dx-react-core';

export class RemoteDataLoader extends React.PureComponent<any, any> {

  ensureNextVirtualPage = (
    { currentPageTriggersMeta, scrollTop },
    { remoteDataEnabled }: Getters,
    { requestNextPage }: Actions,
  ) => {
    if (!remoteDataEnabled) return;

    const {
      topTriggerPosition, bottomTriggerPosition, topTriggerIndex, bottomTriggerIndex,
    } = currentPageTriggersMeta;
    const { containerHeight } = this.state;
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
    console.log('ensure page', params, requestNextPage)
  }

  render() {
    return (
      <Plugin name="RemoteDataLoader">
        <Action name="ensureNextVirtualPage" action={this.ensureNextVirtualPage} />
      </Plugin>
    );
  }
}
