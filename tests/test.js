/*global require: true, exports: true*/
var assert = require('assert');
var FileGroup = require('../index').FileGroup;


var common = new FileGroup([
    'files/aaa.js',
    'files/bbb.js',
    'files/ccc.js'
]);
var foobar1 = new FileGroup([
    'files/ddd.js',
    'files/eee.js',
    'files/fff.js'
]);
var foobar2 = new FileGroup([
    'files/ccc.js',
    common,
    'files/111.js',
    foobar1
]);

foobar2.generate(function (data) {
    var dataArr = data.split('\n'),
        items = ['ccc', 'aaa', 'bbb', '111', 'ddd', 'eee', 'fff', ''],
        i;
    assert.deepEqual(dataArr.length, items.length);
    for (i = 0;i < items.length; i += 1) {
        assert.deepEqual(dataArr[i], items[i]);
    }
});
