fixture `React Chart Demos`
    .page `http://localhost:3004/`;

test('MyTest', async t => {
    await t
        .expect(true).ok();
});
