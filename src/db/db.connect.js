"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnect = void 0;
var mongoose_1 = require("mongoose");
var config_js_1 = require("../config.js");
var dbConnect = function () {
    var uri = "mongodb+srv://".concat(config_js_1.user, ":").concat(config_js_1.passwd, "@cluster0.0imanav.mongodb.net/").concat(config_js_1.db, "?retryWrites=true&w=majority");
    console.log(uri);
    return mongoose_1.default.connect(uri);
};
exports.dbConnect = dbConnect;
