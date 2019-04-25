fixture `React Scheduler Demos`
    .page `http://localhost:3005/`;

test('MyTest', async t => {
    await t
        .expect(true).ok();
});
