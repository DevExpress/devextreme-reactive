fixture `Vue Grid Demos`
    .page `http://localhost:3003/`;

test('MyTest', async t => {
    await t
        .expect(true).ok();
});
