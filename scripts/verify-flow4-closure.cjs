/**
 * Run with: node scripts/verify-flow4-closure.cjs
 * Dependency: typescript (a declared project devDependency).
 * Pure adapter-level tests; does not replace the Playwright/Next.js suite.
 */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const cache = new Map();
let passed = 0;
function load(relative) {
  const pathname = path.resolve(root, relative);
  if (cache.has(pathname)) return cache.get(pathname);
  const code = fs.readFileSync(pathname, 'utf8');
  const output = ts.transpileModule(code, { compilerOptions: {
    module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020,
    esModuleInterop: true, jsx: ts.JsxEmit.ReactJSX
  }, reportDiagnostics: true });
  const errors = output.diagnostics.filter(d => d.category === ts.DiagnosticCategory.Error);
  assert.equal(errors.length, 0, `${relative} has TypeScript transpile errors`);
  const module = {exports:{}};
  cache.set(pathname, module.exports);
  const stubRequire = (id) => {
    if (id.startsWith('@/')) return load(path.join('src', id.slice(2)) + '.ts');
    if (id.startsWith('./') || id.startsWith('../')) return load(path.relative(root, path.resolve(path.dirname(pathname), id + '.ts')));
    return require(id);
  };
  vm.runInNewContext('(function(require,module,exports){' + output.outputText + '\n})', {
    Date, Intl, Set, Map, Number, Object, Math, Array, String, Boolean, JSON, console
  }, {filename:pathname})(stubRequire,module,module.exports);
  return module.exports;
}
function check(label, fn) {fn();++passed; console.log('PASS',label);}
const {transformProfileToHomeViewModel} = load('src/features/student-home/services/home-adapter.ts');
const {DEMO_PERSONAS} = load('src/features/student-home/data/demo-personas.ts');
const {MICRO_ACTIVITIES_CATALOG} = load('src/features/onboarding/data/activities.ts');
const base = DEMO_PERSONAS.persona_c_class12.profile;
const clone = (x)=>JSON.parse(JSON.stringify(x));
const map = (profile, options)=>transformProfileToHomeViewModel(profile,options);
check('Completed fixture event uses event date and is explicitly synthetic',()=>{
  const m=map(base);
  assert.equal(m.growthSnapshot.recentActivity.completedAt,base.activityAttempt.completedAt);
  assert.match(m.growthSnapshot.recentActivity.timeAgo,/Synthetic fixture/);
  assert.match(m.growthSnapshot.recentActivity.timeAgo,/28 Oct 2026/);
  assert.doesNotMatch(m.growthSnapshot.recentActivity.timeAgo,/3 days ago|Just now/);
});
check('Returning fixture does not manufacture 3-days-ago label',()=>{
  const m=map(DEMO_PERSONAS.persona_returning_bcom.profile,{isReturningUser:true});
  assert.doesNotMatch(m.growthSnapshot.recentActivity.timeAgo,/3 days ago|Just now/);
});
check('No completedAt event means no displayed date',()=>{
  const p=clone(base);delete p.activityAttempt.completedAt;
  assert.equal(map(p).growthSnapshot.recentActivity.timeAgo,undefined);
});
check('Malformed event date is not shown',()=>{
  const p=clone(base);p.activityAttempt.completedAt='not-a-date';
  assert.equal(map(p).growthSnapshot.recentActivity.completedAt,undefined);
  assert.equal(map(p).growthSnapshot.recentActivity.timeAgo,undefined);
});
check('Unknown activity ID never produces completed history',()=>{
  const p=clone(base);p.activityAttempt.activityId='unknown-id';
  const m=map(p);
  assert.equal(m.growthSnapshot.recentActivity,undefined);
  assert.equal(m.growthSnapshot.totalPractisedCount,0);
  assert.equal(m.growthSnapshot.hasAttemptedActivity,false);
});
check('Invalid option ID never produces completed history',()=>{
  const p=clone(base);p.activityAttempt.selectedOptionId='nonexistent-choice';
  const m=map(p);
  assert.equal(m.growthSnapshot.recentActivity,undefined);
  assert.equal(m.growthSnapshot.totalPractisedCount,0);
});
check('Contradictory correctness does not produce trusted history',()=>{
  const p=clone(base);const a=MICRO_ACTIVITIES_CATALOG.find(x=>x.id===p.activityAttempt.activityId);
  const choice=a.options.find(x=>x.id===p.activityAttempt.selectedOptionId);
  p.activityAttempt.isCorrect=!choice.isCorrect;
  assert.equal(map(p).growthSnapshot.recentActivity,undefined);
});
check('Skipped/in-progress attempts do not produce completed history',()=>{
  for(const status of ['skipped','in_progress']){
    const p=clone(base);p.activityAttempt.status=status;
    assert.equal(map(p).growthSnapshot.recentActivity,undefined);
  }
});
check('Valid completion uses exact catalog title and topic, never a generic fallback',()=>{
  const p=clone(base);const m=map(p);const a=MICRO_ACTIVITIES_CATALOG.find(x=>x.id===p.activityAttempt.activityId);
  assert.equal(m.growthSnapshot.recentActivity.title,a.title);
  assert.equal(m.growthSnapshot.recentActivity.competencyPractised,a.demonstratedCompetency);
});
check('Recommendations never carry unsupported High Alignment badges',()=>{
  for(const {profile} of Object.values(DEMO_PERSONAS)){
    const m=map(profile);
    assert.equal(m.possibilities.some(x=>x.badgeLabel==='High Alignment'),false);
  }
});
check('Production persona UI is gated at both page and control',()=>{
  const page=fs.readFileSync(path.join(root,'src/app/dashboard/student/page.tsx'),'utf8');
  const bar=fs.readFileSync(path.join(root,'src/features/student-home/components/PersonaSwitcherBar.tsx'),'utf8');
  assert.match(page,/process\.env\.NODE_ENV !== "production" && <PersonaSwitcherBar/);
  assert.match(bar,/process\.env\.NODE_ENV === "production"/);
  assert.match(page,/process\.env\.NODE_ENV === "production" && !hasRealHandoff/);
});
console.log(`${passed}/${passed} adapter/source-level closure checks passed.`);
