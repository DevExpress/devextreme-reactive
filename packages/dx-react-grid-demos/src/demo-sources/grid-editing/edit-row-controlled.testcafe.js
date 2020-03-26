import { Selector } from 'testcafe';

fixture `React Grid Demos - Edit Row Ccontrolled`
  .page`http://localhost:3002/#/demo/grid-editing/edit-row-controlled/bootstrap4/default`;

test('Should correctly process editing in Controlled Mode', async (t) => {
  await t
    .switchToIframe('iframe')
    .click('.dx-g-bs4-table-edit-command-cell#edit')
    .click('.dx-g-bs4-table-edit-command-cell#cancel')
    .expect(Selector('input').count)
    .eql(0);
});
