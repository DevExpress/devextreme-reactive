import { Selector } from 'testcafe';

fixture `React Grid Demos - Edit Row Controlled`
  .page`http://localhost:3002/#/demo/grid-editing/edit-row-controlled/bootstrap4/default/without-frame`;

test('Should correctly process editing in Controlled Mode', async (t) => {
  await t
    .click('#edit')
    .click('#cancel')
    .expect(Selector('input').count)
    .eql(0);
});
