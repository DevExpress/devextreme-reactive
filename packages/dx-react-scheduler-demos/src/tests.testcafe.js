fixture `React Scheduler Demos`
    .page `http://localhost:3005/`
    .meta('instance', '3');

test('MyTest', async t => {
    await t
        .expect(true).ok();
});
