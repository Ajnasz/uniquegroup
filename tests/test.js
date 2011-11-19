/*global require: true, exports: true*/
const assert = require('assert');
const uniquegroup = require('../index');
const FileGroup = uniquegroup.FileGroup;
const UniqueGroup = uniquegroup.UniqueGroup;


var common = new UniqueGroup([
    'files/aaa.js',
    'files/bbb.js',
    'files/ccc.js'
]);
var foobar1 = new UniqueGroup([
    'files/ddd.js',
    'files/eee.js',
    'files/fff.js'
]);
var foobar2 = new UniqueGroup([
    'files/ccc.js',
    common,
    'files/111.js',
    foobar1
]);
var foobar4 = new FileGroup([
    'files/ccc.js',
]);
var foobar3 = new FileGroup([
    foobar4,
    common,
    'files/111.js',
    foobar1
]);

(function testUniqueGroup() {
    var files = ['files/ccc.js', 'files/aaa.js', 'files/bbb.js', 'files/111.js', 'files/ddd.js', 'files/eee.js', 'files/fff.js'], i;
    assert.deepEqual(foobar2.items.length, files.length);
    for (i = 0;i < files.length; i += 1) {
        assert.deepEqual(foobar2.items[i], files[i]);
    }
}());


foobar3.generate(function (data) {
    var dataArr = data.split('\n'),
        items = ['ccc', 'aaa', 'bbb', '111', 'ddd', 'eee', 'fff', ''],
        i;
    assert.deepEqual(dataArr.length, items.length);
    for (i = 0;i < items.length; i += 1) {
        assert.deepEqual(dataArr[i], items[i]);
    }
});
