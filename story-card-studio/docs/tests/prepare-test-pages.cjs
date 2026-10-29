'use strict';
// Build the public GitHub Pages test-pages preview without changing the live app.
// The reviewed candidate is pinned in story-card-studio-pages.yml; fail closed on drift.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');

const verifiedSourceSHA = 'adec93ddcdaefa905a30b173b1da5c7b7c24fa66c5aa460255b9ea0879a36fd2';
const expectedPreviewSHA = '7499323c95b27cffca6378f491cbcb1fcb135e45a86b1fce597d14dee18ec62c';
const sha256 = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const repo = path.resolve(__dirname, '../../..');
const source = path.resolve(process.argv[2] || path.join(repo, 'test-pages-source/story-card-studio/Story-Card-Studio-v5.0.html'));
const outputDir = path.resolve(process.argv[3] || path.join(repo, 'pages-site/test-pages'));
const raw = fs.readFileSync(source);
assert.equal(sha256(raw), verifiedSourceSHA, 'Candidate source changed without review; abort preview publication');

let html = raw.toString('utf8');
const substitutions = [
  ["const STORAGE_KEY='story-card-studio-project-v1';", "const STORAGE_KEY='story-card-studio-project-v1-test-pages';"],
  ["const UNDO_STORAGE_KEY='story-card-studio-deleted-card-v1';", "const UNDO_STORAGE_KEY='story-card-studio-deleted-card-v1-test-pages';"],
  ['<title>Story Card Studio v5.0</title>', '<title>Story Card Studio v5.0 — TEST PREVIEW</title>']
];
for (const [oldText,newText] of substitutions){
  assert.equal(html.split(oldText).length-1, 1, 'Expected exactly one occurrence of '+oldText);
  html = html.replace(oldText,newText);
}
assert(!html.includes("const STORAGE_KEY='story-card-studio-project-v1';"));
assert(!html.includes("const UNDO_STORAGE_KEY='story-card-studio-deleted-card-v1';"));
assert.equal(sha256(Buffer.from(html,'utf8')), expectedPreviewSHA, 'Generated preview changed unexpectedly');

fs.mkdirSync(outputDir, {recursive:true});
fs.writeFileSync(path.join(outputDir,'Story-Card-Studio-v5.0.html'), html);
fs.writeFileSync(path.join(outputDir,'index.html'),[
  '<!doctype html>',
  '<html lang="en">',
  '<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">',
  '<meta name="robots" content="noindex,nofollow">',
  '<title>Story Card Studio — Test Preview</title>',
  '<meta http-equiv="refresh" content="0;url=Story-Card-Studio-v5.0.html"></head>',
  '<body><p>Opening the <a href="Story-Card-Studio-v5.0.html">Story Card Studio development preview</a>.</p></body></html>',
  ''
].join('\n'));
console.log('Verified source SHA256 '+verifiedSourceSHA);
console.log('Published preview SHA256 '+expectedPreviewSHA);
console.log('Separate preview storage keys verified; production artifact is untouched.');
