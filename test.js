import { Selector } from 'testcafe';

fixture`Getting Started`
    .page`127.0.0.1:8080/set-session-data.php`;

test('Session expires after 3 seconds', async t => {
    await t
        .click('#link-to-get-session-data-page')
        .expect(Selector('#text').innerText).eql('HAS SESSION DATA');

    await t
        .wait(3200) // Wait more than 3 seconds
        .click('#reload-page')
        .expect(Selector('#text').innerText).eql('NO SESSION DATA');
});

test('Session does not expire after 3 seconds if page has been reloaded', async t => {
    // Go to second page and check that session is active
    await t
        .click('#link-to-get-session-data-page')
        .expect(Selector('#text').innerText).eql('HAS SESSION DATA');

    // Reload page after 2 seconds and check that session is still active
    await t
        .wait(2000) // 2+ seconds from session creation on first page
        .click('#reload-page')
        .expect(Selector('#text').innerText).eql('HAS SESSION DATA');

    // Reload page after 2 seconds and check that session is still active
    // THIS FAILS BUT SHOULD NOT
    await t
        .wait(2000)
        .click('#reload-page')
        .expect(Selector('#text').innerText).eql('HAS SESSION DATA');
});
