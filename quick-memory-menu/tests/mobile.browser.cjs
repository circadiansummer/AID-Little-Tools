const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {chromium} = require('playwright');
const extension = path.join(__dirname, '../extension');
const source = fs.readFileSync(path.join(extension, 'content.js'), 'utf8');
const css = fs.readFileSync(path.join(extension, 'styles.css'), 'utf8');
const manifest = JSON.parse(fs.readFileSync(path.join(extension, 'manifest.json'), 'utf8'));
const output = path.join(__dirname, '../mobile-artifacts');
const html = `<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1"><style>
*{box-sizing:border-box}body{margin:0;background:#110b1a;color:#eee;font:16px system-ui}main{padding:20px}#commands{position:fixed;bottom:0;left:0;width:100%;height:96px;background:#292131;padding:12px;display:flex;gap:8px}button{font:inherit}#commands button{min-height:44px;flex:1}#dialog{position:fixed;inset:12px;max-width:480px;margin:auto;background:#222;border:1px solid #777;border-radius:12px;display:flex;flex-direction:column;max-height:540px;overflow:hidden}#native{padding:12px;flex:none}#list{overflow:auto;min-height:0;flex:1}article{padding:12px;border:1px solid #555;margin:6px}article button{min-height:40px}header{display:flex;align-items:center;justify-content:space-between;gap:8px}
</style><main><h2>AI Dungeon mobile layout fixture</h2><p>Generated adventure prose.</p><textarea id="game-text-input" style="position:fixed;bottom:12px;left:12px;width:calc(100% - 24px);height:60px;display:none"></textarea></main><div id="commands" aria-label="Command bar"><button>Take a turn</button><button>Continue</button><button>Retry</button></div>`;
const row = text => `<article><span>${text}</span><button aria-label="Pin memory to AI context">Pin</button><button aria-label="Open memory">Open</button></article>`;
test('mobile layouts on play, alpha and beta: placement, search, native toggle and keyboard', {timeout:120000}, async t => {
  const browser = await chromium.launch(process.env.AID_TEST_BROWSER ? {executablePath:process.env.AID_TEST_BROWSER} : {});
  t.after(() => browser.close()); fs.mkdirSync(output,{recursive:true});
  let cases = 0;
  for (const host of ['play','alpha','beta']) {
    assert.ok(manifest.content_scripts[0].matches.includes(`https://${host}.aidungeon.com/*`));
    for (const [width,height] of [[320,568],[390,844],[412,915],[640,360],[1280,800]]) {
      const context = await browser.newContext({viewport:{width,height},isMobile:width<=640,hasTouch:width<=640});
      const page = await context.newPage();
      await page.route('**/*',route=>route.fulfill({contentType:'text/html',body:html}));
      await page.goto(`https://${host}.aidungeon.com/adventure/fixture/mobile/play`);
      await page.addStyleTag({content:css}); await page.addScriptTag({content:source});
      const button = page.locator('#aid-mb-launcher > button'); await button.waitFor({state:'visible'});
      const rect = await button.boundingBox(); const command = await page.locator('#commands').boundingBox();
      assert.ok(rect.x>=0 && rect.y>=0 && rect.x+rect.width<=width && rect.y+rect.height<=height);
      if(width<=640) { assert.ok(rect.y+rect.height<=command.y-8, `${host} ${width}: launcher overlaps native action bar`); assert.ok(rect.height>=44); }
      if(host==='play' && [320,390,640].includes(width)) await page.screenshot({path:path.join(output,`launcher-${width}.png`)});
      await page.evaluate(() => {document.querySelector('#commands').style.display='none';document.querySelector('#game-text-input').style.display='block';window.dispatchEvent(new Event('resize'));});
      if(width<=640) {const composer=await page.locator('#game-text-input').boundingBox(); const moved=await button.boundingBox();assert.ok(moved.y+moved.height<=composer.y-8);}
      await page.locator('#game-text-input').focus();
      await page.evaluate(() => {Object.defineProperty(window.visualViewport,'height',{configurable:true,value:window.innerHeight-220});window.visualViewport.dispatchEvent(new Event('resize'));});
      await page.locator('#aid-mb-launcher').waitFor({state:'hidden'});
      await page.evaluate(() => {document.activeElement.blur();delete window.visualViewport.height;window.visualViewport.dispatchEvent(new Event('resize'));});
      await button.waitFor({state:'visible'});
      await page.evaluate(markup => {const modal=document.createElement('section');modal.id='dialog';modal.setAttribute('role','dialog');modal.innerHTML='<div id="native"><header><h3>Memories</h3><button aria-label="Close memories">×</button></header><div role="tablist"><button role="tab">Timeline</button><button role="tab">Relevance</button></div><button role="switch" aria-checked="true">Show unused</button></div><div id="list">'+markup+'</div>';document.body.append(modal);
        const toggle=modal.querySelector('[role=switch]');toggle.onclick=()=>{const on=toggle.getAttribute('aria-checked')!=='true';toggle.setAttribute('aria-checked',String(on));modal.querySelector('#list article:last-child').hidden=!on;};
        document.addEventListener('pointerdown',e=>{if(!modal.contains(e.target))modal.remove();});
      }, row('David at the beach')+row('Lucy at home')+row('David at the boardwalk'));
      const input=page.locator('.aid-mb-tools input');await input.waitFor({state:'visible'});await input.click();await input.fill('David');
      const dialog=page.locator('#dialog');assert.ok(await dialog.isVisible());
      assert.equal(await page.locator('.aid-mb-match').count(),0);
      await page.getByRole('button',{name:'Search',exact:true}).click();await page.waitForFunction(()=>document.querySelector('output').textContent.startsWith('1 of 2'));
      await page.getByRole('button',{name:'Next',exact:true}).click();await page.waitForFunction(()=>document.querySelector('output').textContent.startsWith('2 of 2'));
      const toggle=page.getByRole('switch');await toggle.click();await toggle.click();assert.equal(await toggle.getAttribute('aria-checked'),'true');
      const bounds=await page.locator('.aid-mb-tools').boundingBox(); const searchRect=await input.boundingBox();assert.ok(searchRect.x>=bounds.x && searchRect.x+searchRect.width<=bounds.x+bounds.width+1);
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth),false);
      if(width<=640){for(const el of await page.locator('.aid-mb-controls button').all())assert.ok((await el.boundingBox()).height>=44);}
      if(host==='play' && [320,390,640].includes(width))await page.screenshot({path:path.join(output,`search-${width}.png`)});
      await page.evaluate(()=>document.querySelector('#dialog').remove());await button.waitFor({state:'visible'});
      await page.evaluate(()=>{history.pushState({},'','/home');window.dispatchEvent(new PopStateEvent('popstate'));});await page.locator('#aid-mb-launcher').waitFor({state:'hidden'});
      cases++;await context.close();
    }
  }
  console.log(`Verified ${cases} host/viewport combinations. Screenshots: ${output}`);
});
