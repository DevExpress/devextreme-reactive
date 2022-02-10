fixture `React Chart Demos`
    .page `http://localhost:3004/`
    .meta('instance', '2');

test('MyTest', async t => {
    await t
        .expect(true).ok();
});
