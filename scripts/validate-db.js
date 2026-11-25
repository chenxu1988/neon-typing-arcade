'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const dbDir = path.join(__dirname, '..', 'db');
const sandbox = { window: {} };
sandbox.global = sandbox;

for (const file of ['ela-words.js', 'dino-sentences.js', 'word-quest-bank.js', 'science-bank.js', 'fraction-bank.js']) {
    const code = fs.readFileSync(path.join(dbDir, file), 'utf8');
    vm.runInNewContext(code, sandbox, { filename: file });
}

const db = sandbox.window.ArcadeDB;
let failures = 0;

function fail(msg) {
    console.error('FAIL:', msg);
    failures++;
}

// 1. Check Plane ELA words for cross-grade overlaps
const g3 = new Set(db.elaWords.grade3);
const g4 = new Set(db.elaWords.grade4);
const g5 = new Set(db.elaWords.grade5);
for (const w of g3) {
    if (g4.has(w)) fail(`elaWords overlap G3 & G4: ${w}`);
    if (g5.has(w)) fail(`elaWords overlap G3 & G5: ${w}`);
}
for (const w of g4) {
    if (g5.has(w)) fail(`elaWords overlap G4 & G5: ${w}`);
}

// 2. Check Word Quest & Science Explorer banks
for (const [name, bank] of [['wordQuestBank', db.wordQuestBank], ['scienceBank', db.scienceBank]]) {
    const seenPrompts = new Set();
    bank.forEach((q, idx) => {
        if (![3, 4, 5].includes(q.grade)) fail(`${name}[${idx}] invalid grade: ${q.grade}`);
        if (!q.prompt || !Array.isArray(q.choices) || q.choices.length !== 4) fail(`${name}[${idx}] invalid choices`);
        if (!q.choices.includes(q.answer)) fail(`${name}[${idx}] answer not in choices: ${q.answer}`);
        if (seenPrompts.has(q.prompt)) fail(`${name}[${idx}] duplicate prompt: ${q.prompt}`);
        seenPrompts.add(q.prompt);
    });
}

// 3. Check Fraction Bank math validity
db.fractionBank.equiv.forEach((eq, idx) => {
    if ((eq.num * eq.targetDenom) % eq.denom !== 0) fail(`fractionBank.equiv[${idx}] non-integer target numerator`);
});
db.fractionBank.compare.forEach((cmp, idx) => {
    const lv = cmp.a[0] / cmp.a[1];
    const rv = cmp.b[0] / cmp.b[1];
    const expected = Math.abs(lv - rv) < 1e-6 ? '=' : (lv < rv ? '<' : '>');
    if (cmp.op !== expected) fail(`fractionBank.compare[${idx}] wrong op ${cmp.op}, expected ${expected}`);
});

if (failures > 0) {
    process.exit(1);
}
console.log(
    `DB OK: elaWords(G3:${g3.size}, G4:${g4.size}, G5:${g5.size}), ` +
    `wordQuest(${db.wordQuestBank.length}), science(${db.scienceBank.length}), ` +
    `fractions(build:${db.fractionBank.build.length}, equiv:${db.fractionBank.equiv.length}, cmp:${db.fractionBank.compare.length})`
);
