fixture `React Common`
    .page `http://localhost:3001/`;

test('MyTest', async t => {
    await t
        .expect(true).ok();
});
