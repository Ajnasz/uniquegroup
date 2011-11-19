/*global require: true, exports: true*/
var FileGroup = function (files) {
    this.files = [];
    if (files) {
        this.add(files);
    }
};
FileGroup.prototype = {
    add: function (files) {
        if (Object.prototype.toString.apply(files) !== '[object Array]') {
            files = [files];
        }
        files.forEach(function (file) {
            if (file instanceof FileGroup) {
                file = file.files;
            }
            this.files = this.files.concat(file);
        }.bind(this));
        this._makeUnique();
    },
    _makeUnique: function () {
        var files = [], hash = {};
        this.files.forEach(function (file) {
            if (!hash[file]) {
                files.push(file);
                hash[file] = true;
            }
        });
        this.files = files;
    },
    generate: function (cb) {
        var output = '',
            me = this,
            index = 0, read,
            fs = require('fs');
        read = function read() {
            fs.readFile(me.files[index], function (err, data) {
                if (err) {
                    throw err;
                }
                output += data;
                index += 1;
                if (index < me.files.length) {
                    read();
                } else {
                    cb(output);
                }
            });
        };
        read();
    }
};
exports.FileGroup = FileGroup;
