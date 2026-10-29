const {test} = require('node:test');
const assert = require('node:assert/strict');
const {readFileSync} = require('node:fs');
const {JSDOM} = require('jsdom');
const source = readFileSync(require('node:path').join(__dirname, '../extension/content.js'), 'utf8');
const actualContext = readFileSync(require('node:path').join(__dirname, 'fixtures/aid-context.html'), 'utf8');
const actualResponse = readFileSync(require('node:path').join(__dirname, 'fixtures/aid-latest-response.html'), 'utf8');
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
function fixture(html) {
  const dom = new JSDOM(html, {url: 'https://play.aidungeon.com/adventure/FubaRpMqNLl7/testing-for-chatgpt/play', runScripts: 'outside-only', pretendToBeVisual: true});
  dom.window.Element.prototype.getClientRects = () => [{top: 0, height: 20}];
  dom.window.Element.prototype.scrollIntoView = function () { this.dataset.scrolled = 'true'; };
  dom.window.eval(source);
  return dom;
}
const row = text => `<article><span>${text}</span><button aria-label="Pin memory to AI context"></button><button aria-label="Open memory">Open · 160 Tokens</button></article>`;
const memories = `<section aria-label="Explore memories"><h2>Memories</h2><button aria-label="Close memories">×</button><div role="tablist"><button role="tab">Timeline</button><button role="tab">Relevance</button></div><div class="list">${row('David at the beach')}${row('Lucy at home')}${row('DAVID on the boardwalk')}${row('David at the beach')}</div></section>`;
test('native memory search is case insensitive, counts memory rows, wraps both ways, and preserves native text', async t => {
  const dom = fixture(memories); t.after(() => dom.window.close());
  const d = dom.window.document; const input = d.querySelector('input');
  assert.ok(input); const original = [...d.querySelectorAll('article')].map(el => el.textContent);
  input.value = 'dAvId'; input.dispatchEvent(new dom.window.Event('input')); await pause(300);
  assert.equal(d.querySelectorAll('.aid-mb-match').length, 0);
  assert.match(d.querySelector('output').textContent, /Press Search/);
  assert.deepEqual([...d.querySelectorAll('.aid-mb-tools button')].map(el => el.textContent), ['Search','Previous','Next']);
  d.querySelector('.aid-mb-tools button').click(); await pause(10);
  assert.match(d.querySelector('output').textContent, /^1 of 3/);
  const [searchButton, prev, next] = d.querySelectorAll('.aid-mb-tools button');
  prev.click(); await pause(10); assert.match(d.querySelector('output').textContent, /^3 of 3/);
  assert.equal(d.querySelectorAll('.aid-mb-current').length, 1);
  next.click(); await pause(10); assert.match(d.querySelector('output').textContent, /^1 of 3/);
  input.dispatchEvent(new dom.window.KeyboardEvent('keydown', {key:'Enter',shiftKey:true,bubbles:true})); await pause(10);
  assert.match(d.querySelector('output').textContent, /^3 of 3/);
  assert.deepEqual([...d.querySelectorAll('article')].map(el => el.textContent), original);
  input.value = 'not present'; input.dispatchEvent(new dom.window.Event('input')); searchButton.click(); await pause(10);
  assert.match(d.querySelector('output').textContent, /No matches/); assert.ok(next.disabled);
  input.value = ''; input.dispatchEvent(new dom.window.Event('input')); await pause(300);
  assert.equal(d.querySelectorAll('.aid-mb-current, .aid-mb-match').length, 0);
});
test('one click follows latest response, View Context, Details, Adventure & Memories, Explore Memories', async t => {
  const dom = fixture('<div aria-label="Last action: A recent AI reply">Reply</div>'); t.after(() => dom.window.close());
  const d = dom.window.document; const clicked = [];
  d.querySelector('[aria-label]').onclick = () => {
    clicked.push('response'); const button = d.createElement('button'); button.textContent = 'View Context';
    button.onclick = () => { clicked.push('context'); button.remove(); const modal = d.createElement('section'); modal.setAttribute('role','dialog'); modal.innerHTML = '<h2>View Context</h2><p>Context used for this action</p><button>Details</button>';
      modal.querySelector('button').onclick = () => { clicked.push('details'); modal.querySelector('button').textContent = 'Adventure & Memories 4452 tokens';
        modal.querySelector('button').onclick = () => { clicked.push('adventure'); modal.querySelector('button').textContent = 'Explore Memories'; modal.querySelector('button').onclick = () => { clicked.push('explore'); modal.remove(); d.body.insertAdjacentHTML('beforeend',memories); }; };
      }; d.body.append(modal);
    }; d.body.append(button);
  };
  d.querySelector('#aid-mb-launcher button').click(); await pause(300);
  assert.deepEqual(clicked, ['response','context','details','adventure','explore']);
  assert.ok(d.querySelector('.aid-mb-tools')); assert.equal(d.querySelector('#aid-mb-launcher [role=status]').textContent, '');
});
test('failure to open a response menu is not misreported as an expired response', async t => {
  const dom = fixture('<div aria-label="Last action: Old reply">Old reply</div>'); t.after(() => dom.window.close());
  dom.window.document.querySelector('#aid-mb-launcher button').click(); await pause(2700);
  assert.match(dom.window.document.querySelector('#aid-mb-launcher [role=status]').textContent, /response menu did not open/);
  assert.doesNotMatch(dom.window.document.querySelector('#aid-mb-launcher [role=status]').textContent, /15 minutes/);
  assert.equal(dom.window.document.querySelector('[aria-label="Last action: Old reply"]').textContent, 'Old reply');
});
test('icon-font menu labels and mouse-up response menus open the full native flow', async t => {
  const dom = fixture('<div id="gameplay-output"><span id="transition-opacity" aria-label="Last action: AI text"><span>AI text</span></span></div>');
  t.after(() => dom.window.close()); const d = dom.window.document;
  d.querySelector('#transition-opacity').addEventListener('mouseup', event => {
    assert.equal(event.target.textContent, 'AI text');
    d.body.insertAdjacentHTML('beforeend', '<div role="menu"><div role="menuitem"><span class="font_icons">w_search</span><span>VIEW CONTEXT</span></div></div>');
    d.querySelector('[role=menuitem]').onclick = () => {
      d.querySelector('[role=menu]').remove(); d.body.insertAdjacentHTML('beforeend', '<section role="dialog"><h2>View Context</h2><p>Context used for this action</p><button><span class="font_icons">w_add</span>Details</button></section>');
      const modal = d.querySelector('[role=dialog]'); modal.querySelector('button').onclick = () => {
        modal.querySelector('button').innerHTML = '<span class="font_icons">w_chevron</span>Adventure &amp; Memories';
        modal.querySelector('button').onclick = () => {
          modal.querySelector('button').innerHTML = '<span class="font_icons">w_search</span>Explore Memories';
          modal.querySelector('button').onclick = () => { modal.remove(); d.body.insertAdjacentHTML('beforeend', memories); };
        };
      };
    };
  });
  d.querySelector('#aid-mb-launcher button').click(); await pause(350);
  assert.ok(d.querySelector('.aid-mb-tools')); assert.equal(d.querySelector('#aid-mb-launcher [role=status]').textContent, '');
});
test('error notices have a dismiss button and fade after 15 seconds', async t => {
  const dom = fixture(''); t.after(() => dom.window.close()); const d = dom.window.document;
  const nativeTimeout = dom.window.setTimeout.bind(dom.window); const pending = new Map();
  dom.window.setTimeout = (fn, ms, ...args) => {
    if (ms === 15000 || ms === 300) { pending.set(ms, fn); return 100000 + ms; }
    return nativeTimeout(fn, ms, ...args);
  };
  d.querySelector('#aid-mb-launcher button').click();
  const notice = d.querySelector('.aid-mb-notice'); assert.equal(notice.hidden, false);
  assert.ok(pending.has(15000)); pending.get(15000)(); assert.ok(notice.classList.contains('aid-mb-fading'));
  pending.get(300)(); assert.equal(notice.hidden, true); assert.equal(d.querySelector('[role=status]').textContent, '');
  d.querySelector('#aid-mb-launcher button').click(); assert.equal(notice.hidden, false);
  d.querySelector('[aria-label="Dismiss message"]').click(); assert.equal(notice.hidden, true);
});
test('supplied live context markup: finds the icon-bearing Explore Memories button', async t => {
  const dom = fixture(actualContext); t.after(() => dom.window.close()); const d = dom.window.document;
  const explore = [...d.querySelectorAll('[role="button"]')].find(el => /Explore Memories/.test(el.textContent));
  assert.ok(explore); assert.match(explore.textContent, /w_search/);
  let clicks = 0; explore.onclick = () => { clicks++; d.querySelector('[role="dialog"]').remove(); d.body.insertAdjacentHTML('beforeend',memories); };
  d.querySelector('#aid-mb-launcher button').click(); await pause(300);
  assert.equal(clicks, 1); assert.ok(d.querySelector('.aid-mb-tools'));
  assert.equal(d.querySelector('#aid-mb-launcher').dataset.version, '0.1.7');
  assert.equal(d.querySelector('#aid-mb-launcher button').textContent, '◈ Memories');
});
test('supplied response structure: clicks the latest AI prose and traverses the real context markup', async t => {
  const dom = fixture('<div id="gameplay-output">'+actualResponse+'<div id="transition-opacity"><span id="action-icon">w_comment</span><span id="action-text">A user input</span></div></div>');
  t.after(() => dom.window.close()); const d = dom.window.document; let playerClicks = 0; let responseClicks = 0;
  d.querySelector('#action-text').onclick = () => playerClicks++;
  d.querySelector('[data-gameplay-story-action-id]').addEventListener('mouseup', () => {
    responseClicks++; d.body.insertAdjacentHTML('beforeend','<div role="menu"><div role="menuitem"><span aria-hidden="true" class="font_icons">w_search</span><span>View Context</span></div></div>');
    d.querySelector('[role="menuitem"]').onclick = () => {
      d.querySelector('[role="menu"]').remove(); d.body.insertAdjacentHTML('beforeend', actualContext);
      [...d.querySelectorAll('[role="button"]')].find(el => /Explore Memories/.test(el.textContent)).onclick = () => { d.querySelector('[role="dialog"]').remove(); d.body.insertAdjacentHTML('beforeend',memories); };
    };
  });
  d.querySelector('#aid-mb-launcher button').click(); await pause(400);
  assert.equal(responseClicks, 1); assert.equal(playerClicks, 0); assert.ok(d.querySelector('.aid-mb-tools'));
  assert.equal(d.querySelector('#aid-mb-launcher [role="status"]').textContent, '');
});
test('latest AI prose uses aria-labelledby and never clicks the player action-text', async t => {
  const dom = fixture('<div id="gameplay-output"><div id="transition-opacity">Older AI response</div><span id="latest-label" hidden>Last action: Newest AI response</span><span id="transition-opacity" aria-labelledby="latest-label"><span>Newest AI response</span></span><div id="transition-opacity"><span id="action-icon">w_comment</span><span id="action-text">User-sent input</span></div><textarea>User editor</textarea></div>');
  t.after(() => dom.window.close()); const d = dom.window.document; const clicked = [];
  const actions = [...d.querySelectorAll('[id="transition-opacity"]')];
  actions.forEach((el, i) => { el.onclick = () => {
    clicked.push(i); const context = d.createElement('button'); context.textContent = 'View Context';
    context.onclick = () => { clicked.push('context'); context.remove(); d.body.insertAdjacentHTML('beforeend', '<section role="dialog"><h2>View Context</h2><p>Context used for this action</p><button>Explore Memories</button></section>');
      d.querySelector('[role="dialog"] button').onclick = () => { d.querySelector('[role="dialog"]').remove(); d.body.insertAdjacentHTML('beforeend', memories); };
    }; d.body.append(context);
  }; });
  d.querySelector('#aid-mb-launcher button').click(); await pause(350);
  assert.deepEqual(clicked, [1, 'context']); assert.ok(d.querySelector('.aid-mb-tools'));
  assert.equal(d.querySelector('#aid-mb-launcher [role=status]').textContent, '');
});
test('unlabelled generated prose is found while trailing player entries and editors are skipped', async t => {
  const dom = fixture('<div id="gameplay-output"><span id="transition-opacity"><span>AI adventure text</span></span><div id="transition-opacity"><span id="action-icon">w_run</span><span id="action-text">Player input</span></div><div aria-label="Action: User story input"><span id="transition-opacity">User story input</span></div><div id="transition-opacity" contenteditable="true">Editor text</div></div>');
  t.after(() => dom.window.close()); const d = dom.window.document; const clicked = [];
  d.querySelectorAll('[id="transition-opacity"]').forEach((el,i) => { el.onclick = () => {
    clicked.push(i); const button = d.createElement('button'); button.textContent = 'View Context'; button.onclick = () => { d.body.insertAdjacentHTML('beforeend', memories); }; d.body.append(button);
  }; });
  d.querySelector('#aid-mb-launcher button').click(); await pause(150);
  assert.deepEqual(clicked, [0]);
});
test('closing and reopening a native modal does not duplicate the toolbar', async t => {
  const dom = fixture(memories); t.after(() => dom.window.close()); const d = dom.window.document;
  assert.equal(d.querySelectorAll('.aid-mb-tools').length, 1);
  d.querySelector('section').remove(); await pause(150); d.body.insertAdjacentHTML('beforeend',memories); await pause(150);
  assert.equal(d.querySelectorAll('.aid-mb-tools').length, 1);
  dom.window.history.pushState({}, '', '/home'); await pause(1550);
  assert.ok(d.querySelector('#aid-mb-launcher').hidden); assert.equal(d.querySelectorAll('.aid-mb-tools').length, 0);
});
test('search sweeps virtualized rows and Previous wraps to an off-screen match', async t => {
  const dom = fixture(memories); t.after(() => dom.window.close()); const d = dom.window.document;
  const list = d.querySelector('.list'); list.style.overflowY = 'auto'; let top = 0;
  Object.defineProperties(list, {scrollHeight: {get: () => 800}, clientHeight: {get: () => 200}, scrollTop: {get: () => top, set: value => { top = Math.max(0, Math.min(600, value)); }}});
  list.getBoundingClientRect = () => ({top: 0});
  const render = () => {
    const start = Math.floor(top / 40);
    list.innerHTML = Array.from({length: Math.min(6, 20 - start)}, (_, i) => row(`Needle memory ${start+i}`)).join('');
    [...list.children].forEach((el, i) => { el.setAttribute('data-index', String(start+i)); el.getBoundingClientRect = () => ({top: (start+i)*40-top}); });
  };
  list.addEventListener('scroll', render); render();
  const input = d.querySelector('input'); input.value = 'needle'; input.dispatchEvent(new dom.window.Event('input'));
  await pause(300); assert.equal(top,0); assert.equal(d.querySelectorAll('.aid-mb-match').length,0);
  input.dispatchEvent(new dom.window.KeyboardEvent('keydown',{key:'Enter',bubbles:true})); await pause(1500);
  assert.match(d.querySelector('output').textContent, /^1 of 20/);
  d.querySelectorAll('.aid-mb-tools button')[1].click(); await pause(150);
  assert.match(d.querySelector('output').textContent, /^20 of 20/);
  assert.match(d.querySelector('.aid-mb-current').textContent, /Needle memory 19/);
});
test('native Show Unused remains in its original header through off/on and search reindexing', async t => {
  const markup = memories.replace('<div class="list">', '<button role="switch" aria-checked="true">Show unused</button><div class="list">');
  const dom = fixture(markup); t.after(() => dom.window.close()); const d = dom.window.document;
  const root = d.querySelector('section'); const toggle = d.querySelector('[role="switch"]');
  assert.equal(d.querySelector('.aid-mb-tools').parentElement, root);
  assert.equal(root.lastElementChild, d.querySelector('.aid-mb-tools'));
  const originalChildren = [...root.children];
  toggle.onclick = () => {
    const enabled = toggle.getAttribute('aria-checked') !== 'true'; toggle.setAttribute('aria-checked',String(enabled));
    root.querySelector('.list').innerHTML = enabled ? row('David used') + row('David unused') : row('David used');
  };
  const input = d.querySelector('.aid-mb-tools input'); input.value = 'David'; input.dispatchEvent(new dom.window.Event('input')); d.querySelector('.aid-mb-tools button').click(); await pause(10);
  toggle.click(); await pause(350);
  assert.equal(toggle.isConnected,true); assert.equal(toggle.getAttribute('aria-checked'),'false');
  assert.match(d.querySelector('output').textContent, /Press Search/);
  d.querySelector('.aid-mb-tools button').click(); await pause(10);
  assert.match(d.querySelector('output').textContent, /^1 of 1/);
  toggle.click(); await pause(350);
  assert.equal(toggle.isConnected,true); assert.equal(toggle.getAttribute('aria-checked'),'true');
  d.querySelector('.aid-mb-tools button').click(); await pause(10);
  assert.match(d.querySelector('output').textContent, /^1 of 2/);
  assert.deepEqual([...root.children], originalChildren);
  assert.equal(root.querySelector('[data-scrolled]'),null);
});
test('search field and buttons stay inside the native dialog for outside-click and focus handling', async t => {
  const dom = fixture('<div role="dialog" style="display:flex;flex-direction:column">'+memories+'</div>');
  t.after(() => dom.window.close()); const d = dom.window.document; const dialog = d.querySelector('[role="dialog"]');
  d.addEventListener('pointerdown', event => { if (!dialog.contains(event.target)) dialog.remove(); });
  d.addEventListener('focusin', event => { if (!dialog.contains(event.target)) dialog.remove(); });
  const tools = d.querySelector('.aid-mb-tools'); assert.equal(tools.parentElement, dialog);
  const input = tools.querySelector('input');
  input.dispatchEvent(new dom.window.MouseEvent('pointerdown', {bubbles:true})); input.focus();
  assert.equal(d.activeElement, input); assert.equal(dialog.isConnected,true);
  input.value='David'; input.dispatchEvent(new dom.window.Event('input')); await pause(300);
  assert.equal(d.querySelectorAll('.aid-mb-match').length,0);
  const buttons = [...tools.querySelectorAll('button')]; assert.deepEqual(buttons.map(el=>el.textContent),['Search','Previous','Next']);
  for(const button of buttons) { button.dispatchEvent(new dom.window.MouseEvent('pointerdown',{bubbles:true})); button.focus(); button.click(); await pause(10); assert.equal(dialog.isConnected,true); }
  assert.match(tools.querySelector('output').textContent,/matching memories/);
});
