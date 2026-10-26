const fs = require('node:fs');
const path = require('node:path');
const dir = __dirname;
const embed = file => JSON.stringify(JSON.parse(fs.readFileSync(path.join(dir, 'data', file), 'utf8').replace(/^\uFEFF/, ''))).replace(/</g, '\\u003c');
const html = fs.readFileSync(path.join(dir, 'template.html'), 'utf8')
  .replace('__ROSTER__', () => embed('roster.json'))
  .replace('__IMAGES__', () => embed('better-dungeons.json'));
fs.writeFileSync(path.join(dir, 'Story-Card-Deck-Builder.html'), html);
console.log('Built standalone Story-Card-Deck-Builder.html');
