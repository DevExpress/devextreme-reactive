fixture `React Grid Demos`
    .page `http://localhost:3002/`
    .meta('instance', '1');

test('MyTest', async t => {
    await t
        .expect(true).ok();
});
