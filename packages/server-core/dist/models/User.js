"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    deviceId: {
        type: String,
        required: true,
        unique: true
    },
    pushToken: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });
exports.default = mongoose_1.model('User', UserSchema);
//# sourceMappingURL=User.js.map