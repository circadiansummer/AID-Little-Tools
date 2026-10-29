(() => {
  'use strict';
  if (document.getElementById('aid-mb-launcher')) return;
  const own = el => !!el.closest('#aid-mb-launcher, .aid-mb-tools');
  function label(el) {
    if (el.getAttribute('aria-label')) return el.getAttribute('aria-label').replace(/\s+/g, ' ').trim();
    // Tamagui icon fonts contribute literal w_* ligatures to textContent.
    // Those glyph names are not part of a button's visible label.
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    let text = ''; let node;
    while ((node = walker.nextNode())) {
      if (!node.parentElement.closest('[aria-hidden="true"], .font_icons, svg, script, style')) text += ' ' + node.textContent;
    }
    return text.replace(/\bw_[\w-]+\b/g, '').replace(/\s+/g, ' ').trim();
  }
  const visible = el => el.isConnected && !el.closest('[hidden], [aria-hidden="true"]') && getComputedStyle(el).display !== 'none' && getComputedStyle(el).visibility !== 'hidden' && el.getClientRects().length > 0;
  const controls = root => [...root.querySelectorAll('button, [role="button"], [role="menuitem"], .is_Button, a')].filter(el => !own(el));
  function findControl(root, re) {
    const usable = el => visible(el) && !el.disabled && !el.closest('[aria-disabled="true"], button:disabled') && re.test(label(el));
    const control = controls(root).find(usable);
    if (control) return control;
    // Some native menu entries are plain spans inside pressable views.
    return [...root.querySelectorAll('span')].find(el => !own(el) && !el.children.length && usable(el));
  }
  function press(el) {
    const rect = el.getBoundingClientRect();
    const options = {bubbles: true, cancelable: true, composed: true, view: window, button: 0, clientX: rect.left + rect.width / 2, clientY: rect.top + rect.height / 2};
    if (typeof PointerEvent !== 'undefined') el.dispatchEvent(new PointerEvent('pointerdown', {...options, pointerId: 1, pointerType: 'mouse', isPrimary: true, buttons: 1}));
    el.dispatchEvent(new MouseEvent('mousedown', {...options, buttons: 1}));
    if (typeof PointerEvent !== 'undefined') el.dispatchEvent(new PointerEvent('pointerup', {...options, pointerId: 1, pointerType: 'mouse', isPrimary: true, buttons: 0}));
    el.dispatchEvent(new MouseEvent('mouseup', {...options, buttons: 0}));
    el.dispatchEvent(new MouseEvent('click', {...options, buttons: 0, detail: 1}));
  }
  function latestResponse() {
    // #action-text is PLAYER input, not generated prose. Never click it or
    // an editable surface as a fallback for the AI response.
    const output = document.querySelector('#gameplay-output') || document;
    const name = el => el.getAttribute('aria-label') || (el.getAttribute('aria-labelledby') || '').split(/\s+/).map(id => document.getElementById(id)?.textContent || '').join(' ');
    const safe = el => !el.closest('[contenteditable]:not([contenteditable="false"]), input, textarea, [id="action-text"]') && !el.querySelector('[id="action-text"], [id="action-icon"], input, textarea, [contenteditable]:not([contenteditable="false"])');
    // Confirmed in the supplied live DOM: generated replies carry a story
    // action ID, while the newest reply references a hidden replay label.
    const nativeLatest = [...output.querySelectorAll('[data-gameplay-story-action-id][aria-labelledby]')]
      .filter(el => visible(el) && safe(el) && /^last action\s*:/i.test(name(el).trim())).at(-1);
    if (nativeLatest) return nativeLatest;
    const named = [...output.querySelectorAll('[aria-label], [aria-labelledby]')].filter(el => {
      if (!visible(el) || own(el)) return false;
      return /^last action\s*:/i.test(name(el).trim()) && safe(el);
    }).at(-1);
    if (named) return named;
    // Older/native layouts expose generated sections through transition-opacity.
    // Restrict this fallback to the gameplay region and exclude player action rows.
    if (output === document) return null;
    return [...output.querySelectorAll('[id="transition-opacity"]')].filter(el => {
      if (!visible(el) || own(el) || !safe(el) || !el.textContent.trim()) return false;
      for (let ancestor = el; ancestor && ancestor !== output; ancestor = ancestor.parentElement) {
        if (/^action(?:\s|:)/i.test(name(ancestor).trim()) || ancestor.querySelector(':scope > [id="action-icon"]')) return false;
      }
      return true;
    }).at(-1) || null;
  }
  function memoryRoot() {
    const named = [...document.querySelectorAll('[aria-label="Explore memories"], [role="dialog"]')].find(el => visible(el) && /timeline/i.test(el.textContent) && /relevance/i.test(el.textContent));
    if (named) return named;
    const close = findControl(document, /^close memories$/i);
    if (close) {
      for (let el = close.parentElement; el && el !== document.body; el = el.parentElement) {
        if (el.querySelector('[role="tablist"], [role="tab"]') && /timeline/i.test(el.textContent) && (/stored memories/i.test(el.textContent) || findControl(el, /^open memory$/i))) return el;
      }
    }
    return null;
  }
  function contextRoot() {
    const dialog = [...document.querySelectorAll('[role="dialog"]')].find(el => visible(el) && /context used for this action/i.test(el.textContent));
    if (dialog) return dialog;
    const title = [...document.querySelectorAll('h1,h2,h3,[role="heading"],span,div')].find(el => visible(el) && /^view context$/i.test(el.textContent.trim()));
    for (let el = title?.parentElement; el && el !== document.body; el = el.parentElement) {
      if (/context used for this action/i.test(el.textContent) && findControl(el, /^(?:(?:[+−–-]\s*)?(?:details|expand)|adventure\s*&\s*memories\b.*|explore memories)$/i)) return el;
    }
    return document;
  }
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
  async function until(fn, ms = 2500) {
    const deadline = Date.now() + ms;
    while (Date.now() < deadline) { const result = fn(); if (result) return result; await wait(80); }
    return null;
  }
  const VERSION = '0.1.6';
  const launcher = document.createElement('div'); launcher.id = 'aid-mb-launcher'; launcher.dataset.version = VERSION;
  const open = document.createElement('button'); open.type = 'button'; open.textContent = '◈ Memories'; open.setAttribute('aria-label', 'Open AI Dungeon memories');
  const message = document.createElement('div'); message.setAttribute('role', 'status');
  const notice = document.createElement('div'); notice.className = 'aid-mb-notice'; notice.hidden = true;
  const dismiss = document.createElement('button'); dismiss.type = 'button'; dismiss.className = 'aid-mb-dismiss'; dismiss.textContent = '×'; dismiss.setAttribute('aria-label', 'Dismiss message');
  notice.append(message, dismiss);
  launcher.append(open, notice); document.body.append(launcher);
  let noticeTimer; let fadeTimer;
  function showMessage(text, timed = true) {
    clearTimeout(noticeTimer); clearTimeout(fadeTimer);
    notice.classList.remove('aid-mb-fading'); message.textContent = text; notice.hidden = !text;
    if (text && timed) noticeTimer = setTimeout(() => {
      notice.classList.add('aid-mb-fading');
      fadeTimer = setTimeout(() => { notice.hidden = true; message.textContent = ''; }, 300);
    }, 15000);
  }
  dismiss.addEventListener('click', () => showMessage(''));
  let route = location.pathname;
  let session = null;
  async function openMemories() {
    if (memoryRoot()) { sync(); session?.input.focus(); return; }
    open.disabled = true; showMessage('Opening memories…', false);
    const startRoute = location.pathname;
    const checkRoute = () => { if (location.pathname !== startRoute) throw new Error('Adventure changed. Please try again.'); };
    try {
      let explore = findControl(document, /^explore memories$/i);
      if (!explore) {
        let context = findControl(document, /^view context$/i);
        if (!context && !/context used for this action/i.test(contextRoot().textContent)) {
          const last = latestResponse();
          if (!last) throw new Error('Could not identify the latest AI-generated text. Click the AI’s adventure text to open its menu, then try Memories again.');
          const textTarget = [...last.querySelectorAll('span,p')].filter(el => visible(el) && !el.children.length && el.textContent.trim() && !el.closest('[aria-hidden="true"], .font_icons')).at(-1) || last;
          press(textTarget);
          context = await until(() => findControl(document, /^view context$/i));
          checkRoute();
          if (!context && !/context used for this action/i.test(contextRoot().textContent)) {
            const menuOpened = !!findControl(document, /^(edit|report an issue)$/i);
            throw new Error(menuOpened
              ? 'AID opened the response menu, but View Context is not available there. AID normally limits it to responses received within the last 15 minutes.'
              : 'Found the AI text, but its response menu did not open. Click the AI text to open its menu, then try Memories again.');
          }
        }
        if (context) { press(context); await until(() => /context used for this action/i.test(contextRoot().textContent)); checkRoute(); }
        if (!/context used for this action/i.test(contextRoot().textContent)) throw new Error('Found View Context, but its window did not open. Open View Context manually, then try Memories again.');
        let adventure = findControl(contextRoot(), /^adventure\s*&\s*memories\b/i);
        if (!adventure) {
          const details = findControl(contextRoot(), /^(?:[+−–-]\s*)?(?:details|expand)$/i);
          if (details) { press(details); adventure = await until(() => findControl(contextRoot(), /^adventure\s*&\s*memories\b/i)); checkRoute(); }
        }
        explore = findControl(contextRoot(), /^explore memories$/i);
        if (!explore && adventure) { press(adventure); explore = await until(() => findControl(contextRoot(), /^explore memories$/i)); checkRoute(); }
      }
      if (!explore) throw new Error('Could not find Explore Memories.');
      press(explore);
      if (!await until(memoryRoot)) throw new Error('AID did not open the memory window. Please try again.');
      checkRoute(); showMessage(''); sync(); session?.input.focus();
    } catch (error) { showMessage(error.message); }
    finally { open.disabled = false; }
  }
  open.addEventListener('click', openMemories);

  // Locate rows using AID's accessible actions, without changing React-owned text.
  function rows(root) {
    const result = [];
    for (const action of controls(root).filter(el => /^open memory$/i.test(label(el)))) {
      for (let row = action.parentElement; row && row !== root; row = row.parentElement) {
        if (controls(row).some(el => /^(?:unpin memory|pin memory)/i.test(label(el))) && controls(row).filter(el => /^open memory$/i.test(label(el))).length === 1) {
          if (!result.includes(row)) result.push(row);
          break;
        }
      }
    }
    return result;
  }
  function rowText(row) {
    const walker = document.createTreeWalker(row, NodeFilter.SHOW_TEXT);
    let text = ''; let node;
    while ((node = walker.nextNode())) {
      if (!node.parentElement.closest('button, [role="button"], .aid-mb-tools')) text += ' ' + node.textContent;
    }
    return text.replace(/\s+/g, ' ').trim();
  }
  function scroller(root, row) {
    for (let el = row?.parentElement; el && root.contains(el); el = el.parentElement) {
      if (/(auto|scroll)/.test(getComputedStyle(el).overflowY) && el.scrollHeight > el.clientHeight) return el;
    }
    return null;
  }
  function clearHighlights(root) { root.querySelectorAll('.aid-mb-match, .aid-mb-current').forEach(el => el.classList.remove('aid-mb-match', 'aid-mb-current')); }
  function attach(root) {
    const tools = document.createElement('div'); tools.className = 'aid-mb-tools'; tools.setAttribute('role', 'search'); tools.setAttribute('aria-label', 'Search memories');
    const bar = document.createElement('div'); bar.className = 'aid-mb-controls';
    const input = document.createElement('input'); input.type = 'search'; input.placeholder = 'Search memories…'; input.setAttribute('aria-label', 'Search memories');
    const searchButton = document.createElement('button'); searchButton.type = 'button'; searchButton.textContent = 'Search';
    const prev = document.createElement('button'); prev.type = 'button'; prev.textContent = 'Previous';
    const next = document.createElement('button'); next.type = 'button'; next.textContent = 'Next';
    const status = document.createElement('output'); status.setAttribute('aria-live', 'polite');
    // Keep extension elements outside AID's React-managed children. Inserting
    // into its dialog can interfere with reconciliation when a filter changes.
    bar.append(input, searchButton, prev, next); tools.append(bar, status); document.body.append(tools);
    const s = {root, tools, input, query: '', hits: [], index: -1, generation: 0, scanning: false, timer: null, pane: null};
    const textKey = row => rowText(row).toLocaleLowerCase();
    function paint() {
      clearHighlights(root);
      for (const row of rows(root)) {
        const text = textKey(row);
        if (s.query && text.includes(s.query)) row.classList.add('aid-mb-match');
        const selected = s.hits[s.index];
        if (selected?.text === text && ((!s.pane && selected.row === row) || (s.pane && Math.abs(s.pane.scrollTop + row.getBoundingClientRect().top - s.pane.getBoundingClientRect().top - selected.offset) < 8))) row.classList.add('aid-mb-current');
      }
      prev.disabled = next.disabled = s.scanning || !s.hits.length;
      searchButton.disabled = s.scanning || !input.value.trim();
      status.textContent = s.scanning ? 'Searching the memory list…' : !s.query ? input.value.trim() ? 'Press Search or Enter to search.' : 'Enter a keyword, then press Search or Enter.' : s.hits.length ? `${s.index + 1} of ${s.hits.length} matching memories${s.partial ? ' (loaded rows only)' : ''}` : `No matches${s.partial ? ' in loaded rows' : ''}.`;
    }
    async function select(index) {
      if (!s.hits.length || s.scanning) return;
      s.index = (index + s.hits.length) % s.hits.length;
      const hit = s.hits[s.index];
      if (s.pane) { s.pane.scrollTop = hit.offset; s.pane.dispatchEvent(new Event('scroll')); await wait(100); }
      if (session !== s || !root.isConnected) return;
      paint();
      const row = !s.pane && hit.row.isConnected ? hit.row : rows(root).find(el => textKey(el) === hit.text && (!s.pane || Math.abs(s.pane.scrollTop + el.getBoundingClientRect().top - s.pane.getBoundingClientRect().top - hit.offset) < 8));
      // Scroll only the memory-list pane; scrollIntoView can also scroll the
      // whole native dialog and move its Show Unused header out of view.
      if (row && s.pane) {
        const rowRect = row.getBoundingClientRect(); const paneRect = s.pane.getBoundingClientRect();
        if (rowRect.top < paneRect.top) s.pane.scrollTop -= paneRect.top - rowRect.top;
        else if (rowRect.bottom > paneRect.bottom) s.pane.scrollTop += rowRect.bottom - paneRect.bottom;
      }
    }
    async function search() {
      const generation = ++s.generation;
      const current = () => session === s && root.isConnected && generation === s.generation;
      s.query = input.value.trim().toLocaleLowerCase(); s.hits = []; s.index = -1; s.partial = false;
      s.scanning = !!s.query; paint();
      if (!s.query) return;
      const initialRows = rows(root); s.pane = scroller(root, initialRows[0]);
      const pane = s.pane; const originalScroll = pane?.scrollTop || 0;
      const seen = new Set();
      function collect() {
        for (const [index, row] of rows(root).entries()) {
          const text = textKey(row);
          const offset = pane ? Math.max(0, pane.scrollTop + row.getBoundingClientRect().top - pane.getBoundingClientRect().top) : 0;
          const key = row.getAttribute('data-index') || `${pane ? Math.round(offset / 4) : index}:${text}`;
          if (text.includes(s.query) && !seen.has(key)) { seen.add(key); s.hits.push({text, offset, row}); }
        }
      }
      // Rendered rows can be virtualized. Sweep the existing list to index them;
      // never fetch, generate a reply, toggle Show Unused, or open individual entries.
      try {
        if (pane) {
          pane.scrollTop = 0; pane.dispatchEvent(new Event('scroll')); await wait(100);
          for (let step = 0; step < 300 && current(); step++) {
            collect();
            const end = pane.scrollHeight - pane.clientHeight;
            if (pane.scrollTop >= end - 2) break;
            const before = pane.scrollTop;
            pane.scrollTop = Math.min(end, before + Math.max(50, pane.clientHeight * .7));
            pane.dispatchEvent(new Event('scroll')); await wait(70);
            if (pane.scrollTop <= before) { s.partial = true; break; }
            if (step === 299) s.partial = true;
          }
        } else collect();
      } finally {
        if (pane && current()) { pane.scrollTop = originalScroll; pane.dispatchEvent(new Event('scroll')); }
      }
      if (!current()) return;
      s.hits.sort((a, b) => a.offset - b.offset); s.scanning = false;
      paint(); if (s.hits.length) await select(0);
    }
    function invalidate() {
      ++s.generation; clearTimeout(s.timer); s.scanning = false; s.query = ''; s.hits = []; s.index = -1; paint();
    }
    input.addEventListener('input', invalidate);
    searchButton.addEventListener('click', search);
    next.addEventListener('click', () => select(s.index + 1)); prev.addEventListener('click', () => select(s.index - 1));
    input.addEventListener('keydown', event => {
      if (event.key === 'Enter') { event.preventDefault(); event.stopPropagation(); if (!s.scanning) { if (event.shiftKey) select(s.index - 1); else if (input.value.trim()) search(); } }
    });
    tools.addEventListener('keydown', event => event.stopPropagation());
    // Native filter changes invalidate results; only an explicit search scans.
    const nativeChange = event => {
      if (event.target.closest('[role="tab"], [role="switch"]')) invalidate();
    };
    root.addEventListener('click', nativeChange);
    s.position = () => {
      const rect = root.getBoundingClientRect(); const height = tools.getBoundingClientRect().height || 94;
      const width = Math.min(Math.max(280, rect.width), Math.max(0, window.innerWidth - 16));
      tools.style.width = `${width}px`;
      tools.style.left = `${Math.max(8, Math.min(rect.left, window.innerWidth - width - 8))}px`;
      const top = rect.top >= height + 16 ? rect.top - height - 8 : rect.bottom + height + 16 <= window.innerHeight ? rect.bottom + 8 : window.innerHeight - height - 8;
      tools.style.top = `${Math.max(8, top)}px`;
    };
    s.destroy = () => { ++s.generation; clearTimeout(s.timer); root.removeEventListener('click', nativeChange); window.removeEventListener('resize', s.position); window.removeEventListener('scroll', s.position, true); tools.remove(); clearHighlights(root); };
    window.addEventListener('resize', s.position); window.addEventListener('scroll', s.position, true);
    s.position();
    s.paint = paint; paint(); return s;
  }
  function sync() {
    const adventure = /^\/adventure\/[^/]+\//.test(location.pathname);
    launcher.hidden = !adventure;
    if (route !== location.pathname) { route = location.pathname; showMessage(''); if (session) { session.destroy(); session = null; } }
    const root = adventure && memoryRoot();
    if (session && (session.root !== root || !session.tools.isConnected)) { session.destroy(); session = null; }
    if (root && !session) session = attach(root);
    session?.position();
  }
  let scheduled = false;
  new MutationObserver(records => {
    if (records.every(record => record.target instanceof Element && own(record.target))) return;
    if (!scheduled) { scheduled = true; setTimeout(() => { scheduled = false; sync(); }, 100); }
  }).observe(document.body, {childList: true, subtree: true});
  window.addEventListener('popstate', sync);
  setInterval(sync, 1500); sync();
})();
