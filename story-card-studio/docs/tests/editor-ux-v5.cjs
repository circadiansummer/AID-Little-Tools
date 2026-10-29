// Story Card Studio v5.0 UX candidate — dependency-free source checks.
// Run: node story-card-studio/docs/tests/editor-ux-v5.cjs
"use strict";
function run(html){
 const passed=[];const check=(ok,label)=>{if(!ok)throw Error("FAIL: "+label);passed.push(label)};
 const m=html.match(/<script>([\s\S]*?)<\/script>/);
 check(Boolean(m),"Standalone inline JavaScript exists");
 const js=m[1];new Function(js);check(true,"Inline JavaScript parses");
 for(const label of [
 "↓ Add JSON to Editor","↑ Download JSON for AID",
 "↓ Add JSON for First Set","↓ Add JSON for Second Set",
 "↓ Import from Editor","→ Send to Editor Tab"
 ])check(html.includes(label),"Button label: "+label);
 check(html.includes("id=\"cardsPage\""),"Editor tab present");
 check(html.includes('class="library-controls"'),"Fixed controls wrapper exists");
 check(html.includes('class="library-scroll"><div id="board"></div></div>'),"Card list scrolls independently");
 check(html.includes('#cardsPage .library-scroll{flex:1 1 auto;min-height:0;min-width:0;overflow-y:auto;'),"Desktop vertical scrolling");
 check(html.includes('@media(max-width:930px)')&&html.includes('#cardsPage .library-scroll{overflow:visible;max-height:none'),"Mobile retains document scroll");
 const validateSource=js.slice(js.indexOf('function validate()'),js.indexOf('function saveForAID()'));
 const validateFor=cards=>new Function('state',validateSource+';return validate;')({cards})();
 check(validateFor([{keys:'',value:''}])===null,"Empty triggers and Entries can export");
 check(validateFor([{keys:'A',value:''}])===null,"Empty Entry can export");
 check(validateFor([{keys:'',value:'B'}])===null,"Empty trigger can export");
 check(validateFor(Array(5001).fill({keys:'',value:''}))!==null,"5000-card upper bound remains");
 check(!html.includes("card(s) have empty triggers or entries"),"Old empty-field block removed");
 const boardScript=js.slice(js.indexOf('const collapsedEditorTypes=new Set()'),js.indexOf('const CORE_FIELDS=new Set('));
 const nodes={board:{innerHTML:'',classList:{toggle(){}}},totalCount:{textContent:''},stackedLayoutBtn:{classList:{toggle(){}},setAttribute(){}},columnsLayoutBtn:{classList:{toggle(){}},setAttribute(){}}};
 const state={boardLayout:'stacked',reEnabled:false,cards:[{_uid:'1',title:'One',keys:'',value:'',description:'',type:'Character'},{_uid:'2',title:'Two',keys:'X',value:'hi',description:'',type:'Location'}],search:'',bulkMode:false,bulkSelected:new Set(),selected:null};
 const ctx={state,el:id=>nodes[id],categories:()=>[['Character',1],['Location',1]],catAct:()=>null,catFor:c=>c.type,name:c=>c.title,esc:s=>String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;'),renderBulkUI(){},currentAct:()=>1,isRE:()=>false,status:()=>'',valI:()=>'',valR:()=>'',classR:()=>''};
 const render=new Function(...Object.keys(ctx),boardScript+';return {renderBoard,collapsedEditorTypes,editorCollapseKey}')(...Object.values(ctx));
 render.renderBoard();
 check(nodes.board.innerHTML.includes('aria-expanded="true"'),"Board type groups initially expanded");
 render.collapsedEditorTypes.add(render.editorCollapseKey('Character'));render.renderBoard();
 check(nodes.board.innerHTML.includes('class="cards" id="editor-group-0" hidden'),"Collapsed group hides cards");
 state.search='One';render.renderBoard();
 check(!nodes.board.innerHTML.includes('id="editor-group-0" hidden'),"Searching temporarily opens matching group");
 const mergeCode=js.slice(js.indexOf('const merger={'),js.indexOf('function mergeConflicts(items)'));
 const M=new Function('esc',mergeCode+';return {mergeListMarkup,collapsedMergeGroups}')((s)=>String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;'));
 const item={side:'left',index:0,card:{type:'Character',keys:'',value:'',title:'Untitled'}};
 check(M.mergeListMarkup([item],false,'left').includes('data-merge-collapse="left"'),"Left source has Type collapse");
 check(M.mergeListMarkup([item],false,'right').includes('data-merge-collapse="right"'),"Right source has Type collapse");
 check(M.mergeListMarkup([item],true).includes('data-merge-collapse="center"'),"Merged center has Type collapse");
 M.collapsedMergeGroups.left.add('Character');
 check(M.mergeListMarkup([item],false,'left').includes('class="merge-group-items" hidden'),"Left group can be hidden");
 check(!M.mergeListMarkup([item],false,'right').includes('class="merge-group-items" hidden'),"Right group retains independent state");
 check(js.includes("collapsedEditorTypes.delete(editorCollapseKey(cat.dataset.category))"),"Dropping into collapsed type reopens it");
 check(js.includes("collapsedEditorTypes.delete(editorCollapseKey(a.dataset.add))"),"Adding to collapsed type reopens it");
 check(js.includes("for(const target of ['mergeLeftList','mergeRightList','mergeCenterList'])"),"Merge click handling covers all three columns");
 return passed;
}
if(typeof module!=='undefined'&&module&&module.exports){
 module.exports=run;
 if(require.main===module){
 const fs=require('node:fs'),path=require('node:path');
 const file=path.resolve(__dirname,'../../Story-Card-Studio-v5.0.html');
 const results=run(fs.readFileSync(file,'utf8'));
 process.stdout.write('PASS '+results.length+'/'+results.length+' focused source checks\n');
 }
}
