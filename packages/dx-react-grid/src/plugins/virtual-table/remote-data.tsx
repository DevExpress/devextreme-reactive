import * as React from 'react';
import { Plugin, Action, Getters, Actions } from '@devexpress/dx-react-core';
import { pageTriggersMeta } from '@devexpress/dx-grid-core';

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

    const triggersMeta = pageTriggersMeta(payload, getters);
    if (triggersMeta === null) {
      return;
    }

    const {
      topTriggerPosition, bottomTriggerPosition, topTriggerIndex, bottomTriggerIndex,
    } = triggersMeta;
    const { viewportTop, estimatedRowHeight, containerHeight } = payload;
    const referencePosition = viewportTop + containerHeight / 2;

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
