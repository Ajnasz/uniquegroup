/*global require: true, exports: true*/
var UniqueGroup = function (items) {
    this.items = [];
    if (items) {
        this.add(items);
    }
};
UniqueGroup.prototype = {
    add: function (items) {
        if (Object.prototype.toString.apply(items) !== '[object Array]') {
            items = [items];
        }
        items.forEach(function (item) {
            if (item instanceof this.constructor) {
                item = item.items;
            }
            this.items = this.items.concat(item);
        }.bind(this));
        this._makeUnique();
    },
    _makeUnique: function () {
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
var FileGroup = function (items) {
    this.items = [];
    if (items) {
        this.add(items);
    }
};
FileGroup.prototype = new UniqueGroup();
FileGroup.prototype.generate = function (cb) {
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
