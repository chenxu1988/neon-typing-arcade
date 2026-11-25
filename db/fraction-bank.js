(function (global) {

    'use strict';

    global.ArcadeDB = global.ArcadeDB || {};

const BUILD_FRACTIONS = [
    [1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [2, 6], [5, 6], [3, 8], [5, 8], [7, 8]
];

const EQUIV_PROBLEMS = [
    { num: 1, denom: 2, targetDenom: 4 },
    { num: 1, denom: 2, targetDenom: 6 },
    { num: 1, denom: 2, targetDenom: 8 },
    { num: 1, denom: 3, targetDenom: 6 },
    { num: 2, denom: 3, targetDenom: 6 },
    { num: 1, denom: 4, targetDenom: 8 },
    { num: 3, denom: 4, targetDenom: 8 }
];

const COMPARE_PROBLEMS = [
    { a: [1, 2], b: [1, 3], op: '>' },
    { a: [2, 4], b: [1, 2], op: '=' },
    { a: [2, 3], b: [3, 4], op: '<' },
    { a: [3, 6], b: [4, 8], op: '=' },
    { a: [5, 8], b: [1, 2], op: '>' },
    { a: [2, 8], b: [1, 3], op: '<' },
    { a: [3, 4], b: [5, 6], op: '<' },
    { a: [4, 6], b: [2, 3], op: '=' }
];

    global.ArcadeDB.fractionBank = { build: BUILD_FRACTIONS, equiv: EQUIV_PROBLEMS, compare: COMPARE_PROBLEMS };

})(window);