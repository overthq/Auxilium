"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var EmergencySchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    location: {
        longitude: {
            type: Number,
            reuqired: true
        },
        latitude: {
            type: Number,
            required: true
        }
    }
}, { timestamps: true });
exports.default = mongoose_1.model("Emergency", EmergencySchema);
