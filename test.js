import { Selector } from 'testcafe';

fixture`Getting Started`
    .page`127.0.0.1:3000`;

test('Session expires after 3 seconds', async t => {
    await t.expect(Selector('#text').innerText).eql('Starting session!');

    await t
        .wait(3200) // Wait more than 3 seconds
        .click('#reload-page')
        .expect(Selector('#text').innerText).eql('Starting session!');
});

test('Session does not expire after 3 seconds if page has been reloaded', async t => {
    // Go to second page and check that session is active
    await t.expect(Selector('#text').innerText).eql('Starting session!');

    // Reload page after 2 seconds and check that session is still active
    await t
        .wait(2000) // 2+ seconds from session creation on first page
        .click('#reload-page')
        .expect(Selector('#text').innerText).eql('Has session');

    // Reload page after 2 seconds and check that session is still active
    // THIS FAILS BUT SHOULD NOT
    await t
        .wait(2000)
        .click('#reload-page')
        .expect(Selector('#text').innerText).eql('Has session');

    await t
        .wait(2000)
        .click('#reload-page')
        .expect(Selector('#text').innerText).eql('Has session');
});
