/*global require: true, exports: true*/

var UniqueGroup = function UniqueGroup (items) {
    this.items = [];
    if (items) {
        this.add(items);
    }
};
UniqueGroup.prototype = {
    add: function uniqueGroupAdd (items) {
        if (Object.prototype.toString.apply(items) !== '[object Array]') {
            items = [items];
        }
        items.forEach(function (item) {
            if (typeof item === 'object') {
                item = item.items;
            }
            this.items = this.items.concat(item);
        }.bind(this));
        this._makeUnique();
    },
    _makeUnique: function uniqueGroupMakeUniqe () {
        var items = [], hash = {};
        this.items.forEach(function (item) {
            if (!hash[item]) {
                items.push(item);
                hash[item] = true;
            }
        });
        this.items = items;
    }
};
var FileGroup = function FileGroup (items) {
    this.items = [];
    if (items) {
        this.add(items);
    }
};
FileGroup.prototype = new UniqueGroup();
FileGroup.prototype.generate = function fileGroupGenerate (cb) {
    var output = '',
        me = this,
        index = 0, read,
        fs = require('fs');
    read = function read() {
        fs.readFile(me.items[index], function (err, data) {
            if (err) {
                throw err;
            }
            output += data;
            index += 1;
            if (index < me.items.length) {
                read();
            } else {
                cb(output);
            }
        });
    };
    read();
};
exports.UniqueGroup = UniqueGroup;
exports.FileGroup = FileGroup;
